import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {

  const policies = [
    {
      icon: assets.exchange_icon,
      title: 'Easy Exchange',
      desc: 'Exchange available within 7 days of delivery.',
    },
    {
      icon: assets.quality_icon,
      title: 'Premium Quality',
      desc: 'Crafted with high quality fabrics and details.',
    },
    {
      icon: assets.support_img,
      title: '24/7 Support',
      desc: 'Always here to help whenever you need us.',
    },
  ]

  return (

    <section className="w-full bg-white py-20 sm:py-28 overflow-hidden">

      <div className="max-w-[1500px] mx-auto px-5 sm:px-10 lg:px-16">

        <div className="flex flex-col lg:flex-row justify-between gap-16">

          <div className="max-w-xl">

            <p className="
              uppercase
              tracking-[6px]
              text-[10px]
              sm:text-xs
              text-neutral-500
              mb-5
            ">
              ZorryFash Services
            </p>

            <h2
              className="
                text-[38px]
                sm:text-[70px]
                lg:text-[90px]
                leading-[0.92]
                tracking-[-3px]
                text-black
                font-light
                mb-8
              "
              style={{
                fontFamily: 'Times New Roman, serif',
              }}
            >
              BUILT FOR
              <br />
              MODERN
              <br />
              LUXURY
            </h2>

            <p className="
              text-neutral-600
              text-sm
              sm:text-base
              leading-relaxed
              max-w-md
            ">
              Designed with timeless aesthetics and premium craftsmanship.
              Every detail is curated to deliver a refined fashion experience.
            </p>

          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-[1px] bg-neutral-200">

            {policies.map((policy, index) => (

              <div
                key={index}
                className="
                  bg-white
                  px-8
                  py-14
                  sm:py-20
                  flex
                  flex-col
                  justify-between
                  min-h-[320px]
                  group
                  transition-all
                  duration-500
                  hover:bg-black
                "
              >

                <div>

                  <img
                    src={policy.icon}
                    alt={policy.title}
                    className="
                      w-7
                      mb-14
                      opacity-80
                      group-hover:invert
                      transition-all
                      duration-500
                    "
                  />

                  <h3
                    className="
                      text-[22px]
                      sm:text-[28px]
                      tracking-[-1px]
                      text-black
                      mb-5
                      font-light
                      leading-tight
                      group-hover:text-white
                      transition-all
                      duration-500
                    "
                    style={{
                      fontFamily: 'Times New Roman, serif',
                    }}
                  >
                    {policy.title}
                  </h3>

                </div>

                <p className="
                  text-neutral-500
                  text-sm
                  leading-relaxed
                  max-w-[240px]
                  group-hover:text-neutral-300
                  transition-all
                  duration-500
                ">
                  {policy.desc}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>

  )
}

export default OurPolicy