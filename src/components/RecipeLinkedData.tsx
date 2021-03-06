import React from 'react'
import { Recipe as RecipeSchema } from 'schema-dts'
import { JsonLd } from 'react-schemaorg'

type Recipe = {
  title: string
  ingredients: string[]
  steps: string[]
  images: any[] // type this as a Gatsby Fluid image
  featuredImage: any // type this as a Gatsby Fluid image
  siteUrl: string // query this one?
  author: string // query this one?
  category: string
  totalTime: string
  prepTime: string
  cookTime: string
  draft: boolean
}

const RecipeLinkedData = ({
  title,
  ingredients = [],
  steps = [],
  featuredImage,
  siteUrl,
  author,
  category,
  totalTime,
}: Recipe) => (
  <JsonLd<RecipeSchema>
    item={{
      '@context': 'https://schema.org',
      '@type': 'Recipe',
      author: {
        '@type': 'Person',
        name: author,
      },
      name: title,
      recipeIngredient: ingredients,
      recipeInstructions: steps.map((step) => ({
        '@type': 'HowToStep',
        text: step,
      })),
      image: featuredImage?.childImageSharp && [
        `${siteUrl}${featuredImage.childImageSharp.fluid.src}`,
      ],
      recipeCuisine: 'Taiwanese',
      suitableForDiet: 'http://schema.org/VegetarianDiet',
      recipeCategory: category,
      totalTime,
    }}
  />
)

export default RecipeLinkedData
