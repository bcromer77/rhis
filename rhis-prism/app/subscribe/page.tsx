export default function SubscribePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-teal-600 to-blue-700 text-white p-8">
      <h1 className="text-4xl font-bold mb-4">Subscribe to RhisSignals</h1>
      <p className="mb-6 text-lg text-center">
        Get full alpha drops, contrarian trade setups, and institutional foresight — before the headlines.
      </p>
      <a
        href="https://your-link-here"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white text-teal-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
      >
        Join Now
      </a>
    // app/subscribe/page.tsx

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function SubscribePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 to-blue-800 text-white flex flex-col items-center px-6 py-16">
      {/* Hero Section */}
      <section className="max-w-3xl text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Signals Before Consensus</h1>
        <p className="text-lg text-gray-200">
          Turn overlooked policy whispers into alpha before Wall Street reacts.
        </p>
        <div className="mt-6">
          <Button size="lg" className="bg-white text-teal-700 font-semibold hover:bg-gray-100">
            Subscribe Now
          </Button>
        </div>
      </section>

      {/* Narrative Hook */}
      <section className="max-w-3xl text-center mb-16">
        <p className="text-xl italic text-gray-100 mb-4">
          “Markets move on whispers. City councils, parliaments, water boards —
          they signal weeks before the headlines. RhisSignals surfaces those
          whispers. You trade them.”
        </p>
        <p className="text-lg text-gray-300">
          Consensus is late. Alpha belongs to the contrarian who listens early.
        </p>
      </section>

      {/* Proof via Data */}
      <section className="max-w-4xl grid md:grid-cols-2 gap-6 mb-16">
        <Card className="bg-white/10 border-none shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2">Phoenix water rationing</h3>
            <p className="text-gray-200 mb-2">Muni spreads widened +35bps after warnings</p>
            <p className="text-sm text-gray-400">Our subscribers saw it first.</p>
          </CardContent>
        </Card>
        <Card className="bg-white/10 border-none shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2">Oil oversupply shock</h3>
            <p className="text-gray-200 mb-2">US crude stocks +5.2M barrels vs expected -1.5M</p>
            <p className="text-sm text-gray-400">Energy plays slammed 10–15%.</p>
          </CardContent>
        </Card>
      </section>

      {/* Subscription Options */}
      <section className="max-w-4xl w-full mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Choose Your Access</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Investor Access */}
          <Card className="bg-white text-teal-800 shadow-lg">
            <CardContent className="p-6 flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-2">Investor Access</h3>
              <p className="text-3xl font-bold mb-4">$49<span className="text-lg">/mo</span></p>
              <ul className="text-sm mb-6 space-y-2 text-center">
                <li>✔ Ad-free archives</li>
                <li>✔ Weekly signal threads</li>
                <li>✔ Daily alpha drops</li>
              </ul>
              <Button className="bg-teal-600 text-white hover:bg-teal-700 w-full">Subscribe</Button>
            </CardContent>
          </Card>

          {/* Whale Access */}
          <Card className="bg-white text-teal-800 shadow-lg">
            <CardContent className="p-6 flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-2">Whale Access</h3>
              <p className="text-3xl font-bold mb-4">$499<span className="text-lg">/mo</span></p>
              <ul className="text-sm mb-6 space-y-2 text-center">
                <li>✔ Everything in Investor</li>
                <li>✔ Personalized scans</li>
                <li>✔ Direct analyst access</li>
              </ul>
              <Button className="bg-teal-600 text-white hover:bg-teal-700 w-full">Subscribe</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-gray-300 text-sm">
        RhisSignals — Advanced regulatory intelligence. <br />
        Follow us on{" "}
        <a href="https://twitter.com/rhissignals" className="underline hover:text-white">
          @RhisSignals
        </a>
      </footer>
    </div>
  )
}

