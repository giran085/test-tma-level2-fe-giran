import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Tambah owners
  await prisma.owner.createMany({
    data: [
      { id: 1, owner_name: 'Apple.Inc' },
      { id: 2, owner_name: 'Samsung Ltd' }
    ],
    skipDuplicates: true
  })

  // Tambah products
  await prisma.product.createMany({
    data: [
      { product_id: 1, product_name: 'Iphone 16 Pro', product_brand: 'phone', created_date: 'now()' },
      { product_id: 2, product_name: 'Ipad Air 11', product_brand: 'Ipad', created_date: 'now()' },
      { product_id: 3, product_name: 'Macbook pro 14', product_brand: 'macbook', created_date: 'now()' },
      { product_id: 4, product_name: 'Galaxy S25 series', product_brand: 'phone', created_date: 'now()' },
      { product_id: 5, product_name: 'Galaxy Tab S10FE', product_brand: 'tablet', created_date: 'now()' },
      { product_id: 6, product_name: 'Evercross X8', product_brand: 'phone', created_date: 'now()' },
      { product_id: 7, product_name: 'Advance G9', product_brand: 'phone', created_date: 'now()' },
    ],
    skipDuplicates: true
  })

  // Tambah relasi products_owners
  await prisma.productOwner.createMany({
    data: [
      { products_id: 1, owners_id: '1' },
      { products_id: 2, owners_id: '1' },
      { products_id: 3, owners_id: '1' },
      { products_id: 4, owners_id: '2' },
      { products_id: 5, owners_id: '2' },
    ],
    skipDuplicates: true
  })

  console.log('✅ Data berhasil ditanam ke database.')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
