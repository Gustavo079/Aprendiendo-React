import { useState, useEffect, useMemo } from 'react'
import { db } from '../data/db'
import type { Guitar, CartItem } from '../types'


export const useCart = () => {
    

 //se encarga de mantener los objetos en caso de haber algo en el carrito
  const initialCart = () : CartItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }
    
    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)

    const MAX_ITEM = 5

    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])
      
    //funcion para agregar un elemento nuevo al carrito
    function addToCart(item : Guitar) {
      const itemExist = cart.findIndex(guitar => guitar.id === item.id)
      if(itemExist >= 0){// validacion de existencia en el carrito
        if(cart[itemExist].quantity >= MAX_ITEM) return
      const updatedCart = [...cart]
      updatedCart[itemExist].quantity++
      setCart(updatedCart)
      } else {
        const newItem : CartItem = {...item, quantity : 1 }
        setCart([...cart, newItem])
      }
    }

      //funcion para eliminar un elemento del carrito
    function removeFromCart(id : Guitar['id']){
      setCart(prevCart => prevCart.filter(guitar => guitar.id != id))
    }

      //incrementar el valor de un producto
    function increaseGuitar(id : Guitar['id']){
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
    function decreaseGuitar(id : Guitar['id']){
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

    function clearCart(){
      setCart([])
    }

    //state derivado
    const isEmpty = useMemo( () => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce( (total, item ) => total + (item.quantity * item.price), 0),
     [cart])
    
    return{
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseGuitar,
        decreaseGuitar,
        clearCart, 
        isEmpty,
        cartTotal
    }

}