// export default function handler(req, res) {
//   res.status(200).json([
//     { id: 1, product_name: 'iPhone 16 Pro', product_brand: 'Apple', owner_name: 'Apple Inc' },
//     { id: 2, product_name: 'iPad Air 11', product_brand: 'Apple', owner_name: 'Apple Inc' },
//     { id: 3, product_name: 'Macbook Pro 14', product_brand: 'Apple', owner_name: 'Apple Inc' },
//     { id: 4, product_name: 'Galaxy S25', product_brand: 'Samsung', owner_name: 'Samsung Ltd' },
//     { id: 5, product_name: 'Galaxy Tab S10FE', product_brand: 'Samsung', owner_name: 'Samsung Ltd' },
//     { id: 6, product_name: 'Evercross X8', product_brand: 'Evercross', owner_name: 'Evercross' },
//     { id: 7, product_name: 'Advance G9', product_brand: 'Advance', owner_name: 'Advance' }
//   ])
// }


pages/api/products.js
import prisma from '@/lib/prisma'

export default async function handler(req, res) {
  try {
    const data = await prisma.products_owners.findMany({
      take: 7,
      include: {
        product: true,
        owner: true
      }
    })

    const result = data.map(item => ({
      id: item.product.product_id,
      product_name: item.product.product_name,
      product_brand: item.product.product_brand,
      owner_name: item.owner.owner_name
    }))

    res.status(200).json(result)
  } catch (error) {
    console.error('API Error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
