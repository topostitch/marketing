'use client'

import { useState } from 'react'

export default function StoriesCategories() {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All Stories' },
    { id: 'cultural', label: 'Cultural Heritage' },
    { id: 'scientific', label: 'Scientific Data' },
    { id: 'institutional', label: 'Institutional Records' },
    { id: 'community', label: 'Community Archives' },
  ]

  return (
    <section className="w-full bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16">
          <div className="mb-8">
            <h2 className="text-2xl font-light text-foreground mb-8">
              Browse by category
            </h2>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-light text-sm transition-all ${
                  activeCategory === category.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Category description */}
          <div className="mt-10 p-6 bg-muted rounded-lg border border-border">
            <p className="text-sm font-light text-muted-foreground">
              Showing stories in: <span className="font-medium text-foreground capitalize">{categories.find(c => c.id === activeCategory)?.label}</span>
            </p>
            <p className="text-sm font-light text-muted-foreground mt-2">
              Each category represents different approaches to knowledge preservation and community stewardship.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
