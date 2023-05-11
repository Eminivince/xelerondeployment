import React from 'react'
import { Link } from 'react-router-dom';
import NFTs from '../../images/NFTs.png'
import { TechList } from './TechList';
import Decentralized from '../../images/decentralized.png'

function Blog() {
    const ArticleItemList = TechList
  return (
    <section className='w-full pt-8'>
        <h4 className='text-[16px] md:text-[30px] lg:text-[40px] lg:text-center text-white px-3'>From the Blog</h4>
        <h1 className='text-[36px] md:text-[45px] lg:text-[64px] lg:text-center px-3 lg:px-24 text-white'>Learn About <span className='text-[#69CED1]'>Xeleron</span> and our technology</h1>

        <div id='hide-scroll' className='flex lg:flex-wrap lg:justify-center w-[98%] overflow-x-scroll'>
            <Link className='ml-2 lg:ml-0 mt-5 mr-2 lg:mr-4'><img src={NFTs} alt="NFT" className='min-w-[400px] w-[400px] lg:w-[592px] h-[324px] lg:h-[391px] hover:opacity-50'/></Link>
            {
                ArticleItemList.map((item, index) => {
                    return <Link key={index} className='ml-2 lg:ml-0 mr-2 mt-5'><img src={item.ArticleItem} alt="item" className='min-w-[278px] h-[324px] lg:min-w-[296px] lg:h-[391px] hover:opacity-50'/></Link>
                })
            }
        </div>

        <div className='w-full pt-14 pb-12'><img src={Decentralized} alt="decentralized img" className='w-11/12 m-auto'/></div>
    </section>
  )
}

export default Blog