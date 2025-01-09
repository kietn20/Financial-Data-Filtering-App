"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

const FinancialApp = () => {
	interface FinancialData {
		date: string;
		revenue: number;
		netIncome: number;
		grossProfit: number;
		eps: number;
		operatingIncome: number;
	}

	const [data, setData] = useState<FinancialData[]>([]);
	const [filteredData, setFilteredData] = useState<FinancialData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// For filters
	const [startYear, setStartYear] = useState("");
	const [endYear, setEndYear] = useState("");
	const [minRevenue, setMinRevenue] = useState("");
	const [maxRevenue, setMaxRevenue] = useState("");
	const [minNetIncome, setMinNetIncome] = useState("");
	const [maxNetIncome, setMaxNetIncome] = useState("");

	// For sorting
	const [sortField, setSortField] = useState("date");
	const [sortDirection, setSortDirection] = useState("desc");

	// Fetch data from API
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
				);
				if (!response.ok) {
					throw new Error("Failed to fetch data");
				}
				const jsonData = await response.json();
				setData(jsonData);
				setFilteredData(jsonData);
			} catch (err) {
				setError((err as Error).message);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	// Apply filters
	useEffect(() => {
		let result = [...data];

		// Date range filter
		if (startYear) {
			result = result.filter(
				(item) =>
					new Date(item.date).getFullYear() >= parseInt(startYear)
			);
		}
		if (endYear) {
			result = result.filter(
				(item) => new Date(item.date).getFullYear() <= parseInt(endYear)
			);
		}

		// Revenue filter
		if (minRevenue) {
			result = result.filter(
				(item) => item.revenue >= parseFloat(minRevenue)
			);
		}
		if (maxRevenue) {
			result = result.filter(
				(item) => item.revenue <= parseFloat(maxRevenue)
			);
		}

		// Net Income filter
		if (minNetIncome) {
			result = result.filter(
				(item) => item.netIncome >= parseFloat(minNetIncome)
			);
		}
		if (maxNetIncome) {
			result = result.filter(
				(item) => item.netIncome <= parseFloat(maxNetIncome)
			);
		}

		// Sort data
		result.sort((a, b) => {
            const compareA =
                sortField === "date"
                    ? new Date(a[sortField as keyof FinancialData] as string)
                    : a[sortField as keyof FinancialData];
            const compareB =
                sortField === "date"
                    ? new Date(b[sortField as keyof FinancialData] as string)
                    : b[sortField as keyof FinancialData];
        
            if (sortDirection === "asc") {
                return compareA > compareB ? 1 : -1;
            }
            return compareA < compareB ? 1 : -1;
        });

		setFilteredData(result);
	}, [
		data,
		startYear,
		endYear,
		minRevenue,
		maxRevenue,
		minNetIncome,
		maxNetIncome,
		sortField,
		sortDirection,
	]);

	const formatNumber = (num: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(num);
    };
    
    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("desc");
        }
    };

	if (loading)
		return (
			<div className="flex items-center justify-center min-h-screen">
				<p className="text-lg">Loading...</p>
			</div>
		);

	if (error)
		return (
			<div className="flex items-center justify-center min-h-screen">
				<p className="text-lg text-red-500">Error: {error}</p>
			</div>
		);

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="container mx-auto p-4">
				<Card>
					<CardHeader>
						<CardTitle>Apple Inc. Financial Data</CardTitle>
					</CardHeader>
					<CardContent>
						{/* Filters */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
							<div>
								<h3 className="text-sm font-medium mb-2">
									Date Range
								</h3>
								<div className="flex gap-2">
									<Input
										type="number"
										placeholder="Start Year"
										value={startYear}
										onChange={(e) =>
											setStartYear(e.target.value)
										}
										className="w-full"
									/>
									<Input
										type="number"
										placeholder="End Year"
										value={endYear}
										onChange={(e) =>
											setEndYear(e.target.value)
										}
										className="w-full"
									/>
								</div>
							</div>
							<div>
								<h3 className="text-sm font-medium mb-2">
									Revenue Range
								</h3>
								<div className="flex gap-2">
									<Input
										type="number"
										placeholder="Min Revenue"
										value={minRevenue}
										onChange={(e) =>
											setMinRevenue(e.target.value)
										}
										className="w-full"
									/>
									<Input
										type="number"
										placeholder="Max Revenue"
										value={maxRevenue}
										onChange={(e) =>
											setMaxRevenue(e.target.value)
										}
										className="w-full"
									/>
								</div>
							</div>
							<div>
								<h3 className="text-sm font-medium mb-2">
									Net Income Range
								</h3>
								<div className="flex gap-2">
									<Input
										type="number"
										placeholder="Min Net Income"
										value={minNetIncome}
										onChange={(e) =>
											setMinNetIncome(e.target.value)
										}
										className="w-full"
									/>
									<Input
										type="number"
										placeholder="Max Net Income"
										value={maxNetIncome}
										onChange={(e) =>
											setMaxNetIncome(e.target.value)
										}
										className="w-full"
									/>
								</div>
							</div>
						</div>

						{/* Table */}
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="border-b">
										<th className="p-2 text-left">
											<Button
												variant="ghost"
												onClick={() =>
													handleSort("date")
												}
												className="font-semibold"
											>
												Date
												<ArrowUpDown className="ml-2 h-4 w-4" />
											</Button>
										</th>
										<th className="p-2 text-left">
											<Button
												variant="ghost"
												onClick={() =>
													handleSort("revenue")
												}
												className="font-semibold"
											>
												Revenue
												<ArrowUpDown className="ml-2 h-4 w-4" />
											</Button>
										</th>
										<th className="p-2 text-left">
											<Button
												variant="ghost"
												onClick={() =>
													handleSort("netIncome")
												}
												className="font-semibold"
											>
												Net Income
												<ArrowUpDown className="ml-2 h-4 w-4" />
											</Button>
										</th>
										<th className="p-2 text-left">
											Gross Profit
										</th>
										<th className="p-2 text-left">EPS</th>
										<th className="p-2 text-left">
											Operating Income
										</th>
									</tr>
								</thead>
								<tbody>
									{filteredData.map((item) => (
										<tr
											key={item.date}
											className="border-b hover:bg-gray-50"
										>
											<td className="p-2">
												{new Date(
													item.date
												).toLocaleDateString()}
											</td>
											<td className="p-2">
												{formatNumber(item.revenue)}
											</td>
											<td className="p-2">
												{formatNumber(item.netIncome)}
											</td>
											<td className="p-2">
												{formatNumber(item.grossProfit)}
											</td>
											<td className="p-2">
												${item.eps.toFixed(2)}
											</td>
											<td className="p-2">
												{formatNumber(
													item.operatingIncome
												)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default FinancialApp;
