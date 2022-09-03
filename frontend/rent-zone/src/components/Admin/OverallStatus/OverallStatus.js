import React from 'react'

const OverallStatus = () => {
  return (
    <>
            <div className="row">
						<div className="col-12 col-md-6 col-xxl d-flex">
							<div className="card flex-fill">
								<div className="card-body">
									<div className="row">
										<div className="col mt-0">
											<h5 className="card-title">Total balance</h5>
										</div>

										<div className="col-auto">
											<div className="stat" >
												<i className="fa-solid fa-dollar-sign align-middle"></i>
											</div>
										</div>
									</div>
									<h4 className="mt-0 mb-1">$53,252 <span className="text-muted">2.30 BTC</span></h4>

									<div className="mb-0">
										<span className="badge badge-success-light"> <i className="mdi mdi-arrow-bottom-right"></i> +6.15% </span>
										<span className="text-muted">Since last week</span>
									</div>

								</div>
							</div>
						</div>
						<div className="col-12 col-md-6 col-xxl d-flex">
							<div className="card flex-fill">
								<div className="card-body">
									<div className="row">
										<div className="col mt-0">
											<h5 className="card-title">USD/BTC</h5>
										</div>

										<div className="col-auto">
											<div className="stat" style={{"background": "#F7931A", "color": "white"}}>
												<i className="fa-solid fa-bitcoin-sign align-middle"></i>
											</div>
										</div>
									</div>
									<h4 className="mt-0 mb-1">$23.077,05 <span className="text-muted">€22.617,47</span></h4>

									<div className="mb-0">
										<span className="text-muted">Volume: 132,691 BTC</span>
									</div>
								</div>
							</div>
						</div>
						<div className="col-12 col-md-6 col-xxl d-flex">
							<div className="card flex-fill">
								<div className="card-body">
									<div className="row">
										<div className="col mt-0">
											<h5 className="card-title">LTC/BTC</h5>
										</div>

										<div className="col-auto">
											<div className="stat" style={{"background": "#345D9D", "color": "white"}}>
												<i className="fa-solid fa-litecoin-sign align-middle"></i>
											</div>
										</div>
									</div>
									<h4 className="mt-0 mb-1">0.00256 <span className="text-muted">$59.02</span></h4>

									<div className="mb-0">
										<span className="text-muted">Volume: 31,268 BTC</span>
									</div>
								</div>
							</div>
						</div>
						<div className="col-12 col-md-6 col-xxl d-flex">
							<div className="card flex-fill">
								<div className="card-body">
									<div className="row">
										<div className="col mt-0">
											<h5 className="card-title">ETH/BTC</h5>
										</div>

										<div className="col-auto">
											<div className="stat" style={{"background": "#627EEA", "color": "white"}}>
												<i className="fa-brands fa-ethereum align-middle"></i>
											</div>
										</div>
									</div>
									<h4 className="mt-0 mb-1">0.07334 <span className="text-muted">$1,691.76</span></h4>

									<div className="mb-0">
										<span className="text-muted">Volume: 32,982 BTC</span>
									</div>
								</div>
							</div>
						</div>
						<div className="col-12 col-md-6 col-xxl d-flex d-none d-xxl-flex">
							<div className="card flex-fill">
								<div className="card-body">
									<div className="row">
										<div className="col mt-0">
											<h5 className="card-title">XMR/BTC</h5>
										</div>

										<div className="col-auto">
											<div className="stat" style={{"background": "#FF6600", "color": "white"}}>
												<i className="fa-brands fa-monero align-middle"></i>
											</div>
										</div>
									</div>
									<h4 className="mt-0 mb-1">0.006854 <span className="text-muted">$157.68</span></h4>

									<div className="mb-0">
										<span className="text-muted">Volume: 28,567 BTC</span>
									</div>
								</div>
							</div>
						</div>
					</div>
                    <div className="row mt-3">
						<div className="col-12 col-lg-6 col-xxl d-flex">
							<div className="card flex-fill">
								<div className="card-header">
									<div className="card-actions float-end">
										<button className="btn btn-sm btn-light">View all</button>
									</div>
									<h5 className="card-title mb-0">Sell Orders</h5>
								</div>
								<table className="table table-sm table-striped my-0">
									<thead>
										<tr>
											<th>Price</th>
											<th className="d-none d-xl-table-cell">BTC</th>
											<th>Sum(BTC)</th>
										</tr>
									</thead>
									<tbody className="text-end">
										<tr>
											<td>0.03892501</td>
											<td className="d-none d-xl-table-cell">1.24864875</td>
											<td>1.26329659</td>
										</tr>
										<tr>
											<td>0.03893754</td>
											<td className="d-none d-xl-table-cell">0.19373225</td>
											<td>1.45702884</td>
										</tr>
										<tr>
											<td>0.03895189</td>
											<td className="d-none d-xl-table-cell">0.00011222</td>
											<td>1.45714106</td>
										</tr>
										<tr>
											<td>0.03896593</td>
											<td className="d-none d-xl-table-cell">0.05366476</td>
											<td>1.51080582</td>
										</tr>
										<tr>
											<td>0.03897932</td>
											<td className="d-none d-xl-table-cell">0.30856527</td>
											<td>1.81937109</td>
										</tr>
										<tr>
											<td>0.03897933</td>
											<td className="d-none d-xl-table-cell">0.01276398</td>
											<td>1.83213507</td>
										</tr>
										<tr>
											<td>0.03899180</td>
											<td className="d-none d-xl-table-cell">0.00029556</td>
											<td>1.83243063</td>
										</tr>
										<tr>
											<td>0.03899784</td>
											<td className="d-none d-xl-table-cell">0.08005194</td>
											<td>1.91248257</td>
										</tr>
										<tr>
											<td>0.03899998</td>
											<td className="d-none d-xl-table-cell">0.10106578</td>
											<td>2.01354835</td>
										</tr>
										<tr>
											<td>0.03899999</td>
											<td className="d-none d-xl-table-cell">0.11699997</td>
											<td>2.13054832</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div className="col-12 col-lg-6 col-xxl d-flex">
							<div className="card flex-fill">
								<div className="card-header">
									<div className="card-actions float-end">
										<button className="btn btn-sm btn-light">View all</button>
									</div>
									<h5 className="card-title mb-0">Buy Orders</h5>
								</div>
								<table className="table table-sm table-striped my-0">
									<thead>
										<tr>
											<th>Price</th>
											<th className="d-none d-xl-table-cell">BTC</th>
											<th>Sum(BTC)</th>
										</tr>
									</thead>
									<tbody className="text-end">
										<tr>
											<td>0.03892000</td>
											<td className="d-none d-xl-table-cell">0.00873616</td>
											<td>0.00873616</td>
										</tr>
										<tr>
											<td>0.03890500</td>
											<td className="d-none d-xl-table-cell">2.58305468</td>
											<td>2.59179084</td>
										</tr>
										<tr>
											<td>0.03890132</td>
											<td className="d-none d-xl-table-cell">2.19999989</td>
											<td>4.79179073</td>
										</tr>
										<tr>
											<td>0.03890053</td>
											<td className="d-none d-xl-table-cell">0.00322305</td>
											<td>4.79501378</td>
										</tr>
										<tr>
											<td>0.03889706</td>
											<td className="d-none d-xl-table-cell">0.60738409</td>
											<td>5.40239787</td>
										</tr>
										<tr>
											<td>0.03888117</td>
											<td className="d-none d-xl-table-cell">0.49926179</td>
											<td>5.90165966</td>
										</tr>
										<tr>
											<td>0.03885500</td>
											<td className="d-none d-xl-table-cell">0.03877729</td>
											<td>5.94043695</td>
										</tr>
										<tr>
											<td>0.03884325</td>
											<td className="d-none d-xl-table-cell">0.00798318</td>
											<td>5.94842013</td>
										</tr>
										<tr>
											<td>0.03883474</td>
											<td className="d-none d-xl-table-cell">0.29455407</td>
											<td>6.24297420</td>
										</tr>
										<tr>
											<td>0.03881616</td>
											<td className="d-none d-xl-table-cell">0.00970404</td>
											<td>6.25267824</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div className="col-12 col-lg-12 col-xxl-3 d-flex">
							<div className="card flex-fill">
								<div className="card-header">
									<div className="card-actions float-end">
										<input type="radio" className="btn-check" name="btnradio" id="buy" autocomplete="off" />
										<label className="btn btn-sm btn-primary" for="buy">Buy</label>

										<input type="radio" className="btn-check" name="btnradio" id="sell" autocomplete="off"/>
										<label className="btn btn-sm btn-light" for="sell">Sell</label>

										<input type="radio" className="btn-check" name="btnradio" id="send" autocomplete="off"/>
										<label className="btn btn-sm btn-light" for="send">Send</label>
									</div>
									<h5 className="card-title mb-0">Operations</h5>
								</div>

								<div className="card-body">
									<p>Place new order:</p>

									<div className="input-group mb-3">
										<label className="input-group-text">Amount</label>
										<select className="form-select" style={{"maxWidth": "88px"}}>
											<option value="BTC" selected="">BTC</option>
											<option value="ETH">ETH</option>
											<option value="LTC">LTC</option>
											<option value="XMR">XMR</option>
										</select>
										<input type="text" className="form-control" value="0.25"/>
									</div>

									<div className="input-group mb-3">
										<label className="input-group-text">Price</label>
										<input type="text" className="form-control" readonly value="23,077.05"/>
										<label className="input-group-text">$</label>
									</div>

									<div className="input-group mb-3">
										<label className="input-group-text">Total</label>
										<input type="text" className="form-control" readonly value="5,769.27"/>
										<label className="input-group-text">$</label>
									</div>

									<div className="d-grid">
										<button type="button" className="btn btn-primary mb-3">Process to wallet</button>
									</div>

									<p className="text-muted mb-0">The final amount could change depending on current market conditions.</p>
								</div>
							</div>
						</div>
					</div>
                    
    </>
  )
}

export default OverallStatus