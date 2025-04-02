import React from 'react';
import ProductList from '../components/ProductList';
import Banner from '../components/Banner';
import CardProduct from '../components/CardProduct';
import MainCardProduct from '../components/MainCardProduct';


const Home = () => {
  return (
    <div>
        <ProductList />
        <Banner />

        <MainCardProduct category={"earphones"} heading={"Earphones"} />
        <MainCardProduct category={"mobiles"} heading={"Mobiles pro"} />
        <CardProduct category={"airpodes"} heading={"top's Airpodes"} />
        <CardProduct category={"watches"} heading={"top's Watches"} />
        <MainCardProduct category={"televisions"} heading={"4K TV"} />
        <CardProduct category={"camera"} heading={"Camera"} />
        <CardProduct category={"mouse"} heading={"Mouse"} />
        <CardProduct category={"processor"} heading={"Processor"} />
        <MainCardProduct category={"trimmers"} heading={"Trimmers"} />
        <CardProduct category={"speakers"} heading={"Speakers"} />
        <CardProduct category={"printers"} heading={"Printers"} />
        <CardProduct category={"refrigerator"} heading={"Refrigerator"} />
    </div>
  )
};

export default Home;