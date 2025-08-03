import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
  const products = await prisma.products.findMany({ take: 7 })

  const result = await Promise.all(products.map(async (p) => {
    const rel = await prisma.products_owners.findFirst({
      where: { product_id: p.product_id },
    })

    const owner = rel
      ? await prisma.owners.findUnique({ where: { id: parseInt(rel.owners_id) } })
      : null

    return {
      id: p.product_id,
      name: p.product_name,
      brand: p.product_brand,
      owner: owner?.owner_name || 'Unknown'
    }
  }))

  res.json(result)
}
