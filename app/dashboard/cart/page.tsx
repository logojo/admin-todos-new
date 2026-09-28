import { cookies } from "next/headers";
import { ItemCard } from "@/app/products";
import { Product, products } from "@/app/products/data/products";
import { Suspense } from "react";

interface Cart {
    id: string,
    amount: number
}


const ViewCart = async () => {
    const cookieStore = await cookies();
    const cookieCart = JSON.parse( cookieStore.get('cart')?.value || '{}') ;
    let cart: Cart[] = [] ;
    

    Object.entries( cookieCart ).forEach(( entry ) => {
      cart.push( { id: entry[0], amount: Number(entry[1]) }
       )
    })
  
    

    const productsCard = products.filter( product => cart.map( (item) => item.id === product.id));

    //console.log(cart);
    
  return (
    <>
       {
            productsCard.map( item => (
                <ItemCard key={item.id} product={item} quantity={1}  />
            ))

        }
    </>
  )
}



export default async function CartPage() {


  return (
    <Suspense fallback={<div>Cargando..</div>}>
       <ViewCart></ViewCart>
    </Suspense>
  );
}