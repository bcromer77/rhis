import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const headline = searchParams.get('headline');

    if (!headline) {
      return NextResponse.json(
        { error: 'Headline parameter is required' },
        { status: 400 }
      );
    }

    await client.connect();
    const db = client.db('rhis');
    const collection = db.collection('crisis_signals');

    // Create text index if it doesn't exist
    try {
      await collection.createIndex({ headline: 'text', summary: 'text' });
    } catch (error) {
      // Index might already exist, continue
    }

    // Fixed MongoDB query - moved score projection to .project() method
    const results = await collection
      .find({ $text: { $search: headline } })
      .project({ 
        headline: 1,
        summary: 1,
        severity: 1,
        category: 1,
        timestamp: 1,
        source: 1,
        score: { $meta: "textScore" }
      })
      .sort({ score: { $meta: "textScore" } })
      .limit(12)
      .toArray();

    // Transform results into Crisis Card format
    const crisisCards = results.map((result: any) => ({
      id: result._id.toString(),
      headline: result.headline || 'No headline available',
      summary: result.summary || 'No summary available',
      severity: result.severity || 'Medium',
      category: result.category || 'General',
      timestamp: result.timestamp || new Date().toISOString(),
      source: result.source || 'Unknown',
      score: result.score || 0
    }));

    return NextResponse.json({
      success: true,
      results: crisisCards,
      count: crisisCards.length
    });

  } catch (error) {
    console.error('Headline search error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to search headlines',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
