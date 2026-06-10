import React from 'react'
import Hero from '../components/Hero'
import EditorialSection from '../components/EditorialSection'
import SplitImageSection from '../components/SplitImageSection'
import SplitImageSection2 from '../components/SplitImageSection2'
import SummerSection from '../components/SummerSection'
import LatestTransformations from '../components/LatestTransformations'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'

const Home = () => {
  return (
    <div className="-mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw]">
      <Hero />
      <EditorialSection />
      <SplitImageSection2 />
      <SummerSection />
      <LatestTransformations />
      <BestSeller />
    </div>
  )
}

export default Home
