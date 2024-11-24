import { useAppContext } from '@/context/AppContext'
import React, { useEffect } from 'react'

type Props = {}

function usePrice() {

    const {tokenPrice, setTokenPrice}  = useAppContext()
    
    useEffect(()=>{
        fetch("/api/prices")
        setTokenPrice(1.5)
    },[])
  return {}
}

export default usePrice