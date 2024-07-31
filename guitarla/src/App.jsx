import { useState  } from 'react'
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from './data/db'

function App() {
    
    const [data, setData] = useState(db)
    const [cart, setCart] = useState([])

    const MAX_ITEM = 5
      
      //funcion para agregar un elemento nuevo al carrito
    function addToCart(item) {
      const itemExist = cart.findIndex(guitar => guitar.id === item.id)
      if(itemExist >= 0){// validacion de existencia en el carrito
        if(cart[itemExist].quantity >= MAX_ITEM) return
      const updatedCart = [...cart]
      updatedCart[itemExist].quantity++
      setCart(updatedCart)
      }else{
       item.quantity = 1
        setCart([...cart, item])
      }
    }
      //funcion para eliminar un elemento del carrito
    function removeFromCart(id){
      setCart(prevCart => prevCart.filter(guitar => guitar.id != id))
    }

      //incrementar el valor de un producto
    function increaseGuitar(id){
      const updatedCart = cart.map( item => {
        if(item.id === id && item.quantity < MAX_ITEM){
          return {
            ...item,
            quantity: item.quantity + 1
          }
        }
        return item
      })
      setCart(updatedCart)
    }

    //disminuir el valor de un producto
    function decreaseGuitar(id){
      const declineCart = cart.map( item => {
        if(item.id === id && item.quantity > 1){
          return {
            ...item,
            quantity: item.quantity - 1
          }
        }
        return item
      })
      setCart(declineCart)
    }

  return (
    <>  

    <Header
      cart={cart}
      removeFromCart= {removeFromCart}
      increaseGuitar={increaseGuitar}
      decreaseGuitar={decreaseGuitar}
    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar 
              key={guitar.id}
              guitar={guitar}
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App
