import React from 'react'

const SizeGuide = () => {
  return (
    <div className='py-10 flex flex-col gap-5 max-w-4xl mx-auto min-h-[60vh]'>
        <div className='text-2xl text-center pt-8 border-t'>
            <h2 className='font-medium text-gray-800'>Size Guide</h2>
        </div>
        <div className='text-gray-600 px-4 mt-6 flex flex-col gap-6'>
            <p>Finding the perfect fit is important to us. Use our generic sizing chart below to find your correct measurement.</p>
            
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Size</th>
                            <th className="py-3 px-6 text-left">Chest (inches)</th>
                            <th className="py-3 px-6 text-left">Waist (inches)</th>
                            <th className="py-3 px-6 text-left">Hips (inches)</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        <tr className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-3 px-6 text-left whitespace-nowrap"><span className="font-medium">Small (S)</span></td>
                            <td className="py-3 px-6 text-left">36-38</td>
                            <td className="py-3 px-6 text-left">29-31</td>
                            <td className="py-3 px-6 text-left">37-39</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-3 px-6 text-left whitespace-nowrap"><span className="font-medium">Medium (M)</span></td>
                            <td className="py-3 px-6 text-left">39-41</td>
                            <td className="py-3 px-6 text-left">32-34</td>
                            <td className="py-3 px-6 text-left">40-42</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-3 px-6 text-left whitespace-nowrap"><span className="font-medium">Large (L)</span></td>
                            <td className="py-3 px-6 text-left">42-44</td>
                            <td className="py-3 px-6 text-left">35-37</td>
                            <td className="py-3 px-6 text-left">43-45</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-3 px-6 text-left whitespace-nowrap"><span className="font-medium">X-Large (XL)</span></td>
                            <td className="py-3 px-6 text-left">45-47</td>
                            <td className="py-3 px-6 text-left">38-40</td>
                            <td className="py-3 px-6 text-left">46-48</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <h3 className='font-bold text-gray-800 mb-2'>How to Measure</h3>
            <ul className='list-disc pl-5 mb-4 space-y-2'>
                <li><strong>Chest:</strong> Measure under arms around the fullest part of the chest. Be sure to keep tape level across back and comfortably loose.</li>
                <li><strong>Waist:</strong> Measure around natural waist with a measuring tape.</li>
                <li><strong>Hips:</strong> Stand with heels together, and measure around the fullest part of your hips.</li>
            </ul>
        </div>
    </div>
  )
}

export default SizeGuide
