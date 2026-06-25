import React, { useState } from 'react';

const RoasteryProfitCompass = () => {
  const [monthlyTarget, setMonthlyTarget] = useState({
    revenue: 0,
    profit: 0,
    founderPay: 0,
    growthReserve: 0,
  });

  const [products, setProducts] = useState([
    {
      name: '250g retail bag',
      sellingPrice: 12.5,
      roastedWeight: 0.25,
      units: 400,
      greenCostKg: 8.5,
      roastLoss: 0.15,
      packaging: 0.65,
      label: 0.15,
      paymentFee: 0.029,
      deliveryCost: 0,
      labourCost: 0,
    },
    {
      name: '1kg horeca bag',
      sellingPrice: 30.0,
      roastedWeight: 1,
      units: 80,
      greenCostKg: 8.5,
      roastLoss: 0.15,
      packaging: 1.2,
      label: 0.2,
      paymentFee: 0.015,
      deliveryCost: 1.5,
      labourCost: 0,
    },
  ]);

  const [fixedCosts, setFixedCosts] = useState({
    rent: 1200,
    wages: 0,
    machineLease: 0,
    accountant: 250,
    insurance: 150,
    software: 150,
    energyBase: 350,
    marketing: 500,
    maintenance: 200,
    otherOverhead: 300,
  });

  const [production, setProduction] = useState({
    roasterSize: 12,
    fillRate: 0.8,
    roastCycleMinutes: 14,
    setupMinutes: 6,
    productiveDaysPerMonth: 8,
    maxHoursPerDay: 5,
    capacityBuffer: 0.2,
  });

  const [results, setResults] = useState(null);

  const calcResults = () => {
    let totalRevenue = 0;
    let totalVariableCost = 0;
    let totalContribution = 0;
    let totalRoastedKg = 0;
    let totalGreenKg = 0;

    products.forEach((prod) => {
      const netRevenue = prod.sellingPrice * (1 - prod.paymentFee);
      const greenCost = (prod.greenCostKg * prod.roastedWeight) / (1 - prod.roastLoss);
      const variableCost = greenCost + prod.packaging + prod.label + prod.deliveryCost + prod.labourCost;
      const contribution = netRevenue - variableCost;
      const monthlyContribution = contribution * prod.units;
      totalRevenue += prod.sellingPrice * prod.units;
      totalVariableCost += variableCost * prod.units;
      totalContribution += monthlyContribution;
      totalRoastedKg += prod.roastedWeight * prod.units;
      totalGreenKg += (prod.roastedWeight * prod.units) / (1 - prod.roastLoss);
    });

    const fixedCostsTotal = Object.values(fixedCosts).reduce((sum, v) => sum + (isNaN(v) ? 0 : Number(v)), 0);
    const operatingProfit = totalContribution - fixedCostsTotal;
    const freeCashflow = operatingProfit - monthlyTarget.founderPay - monthlyTarget.growthReserve;
    const totalUnits = products.reduce((sum, p) => sum + p.units, 0);
    const averageContribution = totalUnits > 0 ? totalContribution / totalUnits : 0;
    const breakEvenUnits = averageContribution > 0 ? fixedCostsTotal / averageContribution : 0;

    const kgPerBatch = production.roasterSize * production.fillRate;
    const batchesPerMonth = kgPerBatch > 0 ? totalRoastedKg / kgPerBatch : 0;
    const daysFactor = production.productiveDaysPerMonth > 0 ? production.productiveDaysPerMonth / 7 : 0;
    const batchesPerWeek = daysFactor ? batchesPerMonth / daysFactor : 0;
    const hoursPerBatch = (production.roastCycleMinutes + production.setupMinutes) / 60;
    const roastingHoursPerWeek = batchesPerWeek * hoursPerBatch;
    const maxWeeklyHours = production.maxHoursPerDay * daysFactor;
    const utilisation = maxWeeklyHours > 0 ? roastingHoursPerWeek / maxWeeklyHours : 0;

    const minRoasterSize = production.fillRate > 0 ? kgPerBatch / production.fillRate : 0;
    const comfortableRoaster = minRoasterSize * 1.2;
    const growthRoaster = minRoasterSize * 1.5;

    const contributionMargin = totalRevenue > 0 ? totalContribution / totalRevenue : 0;
    const warnings = [];
    if (contributionMargin < 0.35) {
      warnings.push('Your contribution margin is probably too low for a healthy micro-roastery.');
    }
    if (operatingProfit < 0) {
      warnings.push('Your operating profit is negative. Consider adjusting prices or costs.');
    }
    if (utilisation > 0.85) {
      warnings.push('Your roaster utilisation exceeds 85%; consider a larger roaster or more production days.');
    }
    if (utilisation < 0.3 && totalRoastedKg > 0) {
      warnings.push('Your roaster may be oversized for current volume.');
    }

    return {
      totalRevenue,
      totalVariableCost,
      totalContribution,
      fixedCostsTotal,
      operatingProfit,
      freeCashflow,
      breakEvenUnits,
      totalRoastedKg,
      totalGreenKg,
      batchesPerMonth,
      batchesPerWeek,
      roastingHoursPerWeek,
      utilisation,
      minRoasterSize,
      comfortableRoaster,
      growthRoaster,
      warnings,
    };
  };

  const handleCalculate = () => {
    setResults(calcResults());
  };

  const handleProductChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = parseFloat(value) || 0;
    setProducts(updated);
  };

  const handleFixedCostChange = (field, value) => {
    setFixedCosts({ ...fixedCosts, [field]: parseFloat(value) || 0 });
  };

  const handleProductionChange = (field, value) => {
    setProduction({ ...production, [field]: parseFloat(value) || 0 });
  };

  const handleMonthlyChange = (field, value) => {
    setMonthlyTarget({ ...monthlyTarget, [field]: parseFloat(value) || 0 });
  };

  return (
    <div className='max-w-5xl mx-auto px-4 py-8'>
      <header className='mb-8'>
        <h1 className='text-3xl font-bold'>Kokowa Roastery Profit Compass™</h1>
        <p className='text-gray-600 mt-2'>A simple operating model for micro-roastery founders.</p>
      </header>

      <section className='bg-white p-6 rounded-lg shadow mb-8'>
        <h2 className='text-xl font-semibold mb-4'>Monthly Target</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm'>Desired monthly revenue (€)</label>
            <input type='number' className='mt-1 w-full border rounded p-2' value={monthlyTarget.revenue} onChange={(e) => handleMonthlyChange('revenue', e.target.value)} />
          </div>
          <div>
            <label className='block text-sm'>Desired operating profit (€)</label>
            <input type='number' className='mt-1 w-full border rounded p-2' value={monthlyTarget.profit} onChange={(e) => handleMonthlyChange('profit', e.target.value)} />
          </div>
          <div>
            <label className='block text-sm'>Desired founder pay (€)</label>
            <input type='number' className='mt-1 w-full border rounded p-2' value={monthlyTarget.founderPay} onChange={(e) => handleMonthlyChange('founderPay', e.target.value)} />
          </div>
          <div>
            <label className='block text-sm'>Monthly growth reserve (€)</label>
            <input type='number' className='mt-1 w-full border rounded p-2' value={monthlyTarget.growthReserve} onChange={(e) => handleMonthlyChange('growthReserve', e.target.value)} />
          </div>
        </div>
      </section>

      <section className='bg-white p-6 rounded-lg shadow mb-8'>
        <h2 className='text-xl font-semibold mb-4'>Products</h2>
        {products.map((prod, idx) => (
          <div key={idx} className='mb-6'>
            <h3 className='font-medium mb-2'>{prod.name}</h3>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
              <div>
                <label className='block text-sm'>Selling price (€)</label>
                <input type='number' className='mt-1 w-full border rounded p-2' value={prod.sellingPrice} onChange={(e) => handleProductChange(idx, 'sellingPrice', e.target.value)} />
              </div>
              <div>
                <label className='block text-sm'>Roasted weight (kg)</label>
                <input type='number' className='mt-1 w-full border rounded p-2' value={prod.roastedWeight} onChange={(e) => handleProductChange(idx, 'roastedWeight', e.target.value)} />
              </div>
              <div>
                <label className='block text-sm'>Expected monthly units</label>
                <input type='number' className='mt-1 w-full border rounded p-2' value={prod.units} onChange={(e) => handleProductChange(idx, 'units', e.target.value)} />
              </div>
              <div>
                <label className='block text-sm'>Green coffee cost/kg (€)</label>
                <input type='number' className='mt-1 w-full border rounded p-2' value={prod.greenCostKg} onChange={(e) => handleProductChange(idx, 'greenCostKg', e.target.value)} />
              </div>
              <div>
                <label className='block text-sm'>Roast loss (%)</label>
                <input type='number' className='mt-1 w-full border rounded p-2' value={prod.roastLoss} onChange={(e) => handleProductChange(idx, 'roastLoss', e.target.value)} />
              </div>
              <div>
                <label className='block text-sm'>Packaging cost (€)</label>
                <input type='number' className='mt-1 w-full border rounded p-2' value={prod.packaging} onChange={(e) => handleProductChange(idx, 'packaging', e.target.value)} />
              </div>
              <div>
                <label className='block text-sm'>Label cost (€)</label>
                <input type='number' className='mt-1 w-full border rounded p-2' value={prod.label} onChange={(e) => handleProductChange(idx, 'label', e.target.value)} />
              </div>
              <div>
                <label className='block text-sm'>Payment fee (%)</label>
                <input type='number' className='mt-1 w-full border rounded p-2' value={prod.paymentFee} onChange={(e) => handleProductChange(idx, 'paymentFee', e.target.value)} />
              </div>
              <div>
                <label className='block text-sm'>Delivery cost (€)</label>
                <input type='number' className='mt-1 w-full border rounded p-2' value={prod.deliveryCost} onChange={(e) => handleProductChange(idx, 'deliveryCost', e.target.value)} />
              </div>
              <div>
                <label className='block text-sm'>Labour cost (€)</label>
                <input type='number' className='mt-1 w-full border rounded p-2' value={prod.labourCost} onChange={(e) => handleProductChange(idx, 'labourCost', e.target.value)} />
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className='bg-white p-6 rounded-lg shadow mb-8'>
        <h2 className='text-xl font-semibold mb-4'>Fixed Monthly Costs</h2>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          {Object.keys(fixedCosts).map((key) => (
            <div key={key}>
              <label className='block text-sm capitalize'>{key.replace(/([A-Z])/g, ' $1')}</label>
              <input type='number' className='mt-1 w-full border rounded p-2' value={fixedCosts[key]} onChange={(e) => handleFixedCostChange(key, e.target.value)} />
            </div>
          ))}
        </div>
      </section>

      <section className='bg-white p-6 rounded-lg shadow mb-8'>
        <h2 className='text-xl font-semibold mb-4'>Production Setup</h2>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          {Object.keys(production).map((key) => (
            <div key={key}>
              <label className='block text-sm capitalize'>{key.replace(/([A-Z])/g, ' $1')}</label>
              <input type='number' className='mt-1 w-full border rounded p-2' value={production[key]} onChange={(e) => handleProductionChange(key, e.target.value)} />
            </div>
          ))}
        </div>
      </section>

      <button onClick={handleCalculate} className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded'>
        Run the model
      </button>

      {results && (
        <section className='mt-8'>
          <h2 className='text-xl font-semibold mb-4'>Results</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            <div className='p-4 bg-gray-50 rounded'>
              <h3 className='font-medium'>Monthly Revenue</h3>
              <p className='text-lg'>{results.totalRevenue.toFixed(2)} €</p>
            </div>
            <div className='p-4 bg-gray-50 rounded'>
              <h3 className='font-medium'>Total Contribution</h3>
              <p className='text-lg'>{results.totalContribution.toFixed(2)} €</p>
            </div>
            <div className='p-4 bg-gray-50 rounded'>
              <h3 className='font-medium'>Operating Profit</h3>
              <p className='text-lg'>{results.operatingProfit.toFixed(2)} €</p>
            </div>
            <div className='p-4 bg-gray-50 rounded'>
              <h3 className='font-medium'>Free Cashflow</h3>
              <p className='text-lg'>{results.freeCashflow.toFixed(2)} €</p>
            </div>
            <div className='p-4 bg-gray-50 rounded'>
              <h3 className='font-medium'>Green coffee needed</h3>
              <p className='text-lg'>{results.totalGreenKg.toFixed(2)} kg</p>
            </div>
            <div className='p-4 bg-gray-50 rounded'>
              <h3 className='font-medium'>Batches per month</h3>
              <p className='text-lg'>{results.batchesPerMonth.toFixed(1)}</p>
            </div>
            <div className='p-4 bg-gray-50 rounded'>
              <h3 className='font-medium'>Roaster utilisation</h3>
              <p className='text-lg'>{(results.utilisation * 100).toFixed(1)}%</p>
            </div>
          </div>
          {results.warnings.length > 0 && (
            <div className='mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400'>
              <h3 className='font-medium mb-2'>Founder Reality Check</h3>
              <ul className='list-disc pl-5 text-yellow-800'>
                {results.warnings.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          )}
          <div className='mt-6'>
            <h3 className='font-medium mb-2'>Recommended Roaster Sizes</h3>
            <p>Minimum viable: {results.minRoasterSize.toFixed(2)} kg</p>
            <p>Comfortable: {results.comfortableRoaster.toFixed(2)} kg</p>
            <p>Growth-ready: {results.growthRoaster.toFixed(2)} kg</p>
          </div>
        </section>
      )}

      <div className='mt-12'>
        <h2 className='text-xl font-semibold mb-2'>Want a sharper roastery model?</h2>
        <p className='text-gray-600 mb-4'>This calculator gives you a first operating lens. Kokowa Labs helps coffee founders turn these numbers into a real positioning, pricing, production and go-to-market system.</p>
        <a href='https://kokowalabs.com/contact' className='inline-block bg-gray-800 text-white px-4 py-2 rounded'>Book a strategic roastery review</a>
        <p className='text-sm text-gray-500 mt-2'>For founders preparing to launch, reposition or scale a specialty coffee business.</p>
      </div>

      <footer className='mt-12 text-xs text-gray-500'>
        © Kokowa Labs. Kokowa Roastery Profit Compass™ is a proprietary strategic modelling tool. For educational planning only. This model simplifies real-world roastery economics and should be validated with an accountant, advisor, or internal financial model before making investment decisions.
      </footer>
    </div>
  );
};

export default RoasteryProfitCompass;
