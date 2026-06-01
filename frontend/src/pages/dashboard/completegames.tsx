// import React from 'react'
// import "./newprofile.css"
// import accountService from '../../services/account.service';
// import { AxiosResponse } from 'axios';
// import moment from 'moment-timezone';
// import { betDateFormat, dateFormat } from '../../utils/helper';
// import { selectUserData } from '../../redux/actions/login/loginSlice';
// import { useAppSelector } from '../../redux/hooks';
// import UserService from "../../services/user.service";

// const Completegames = () => {
//   const [marketData, setmarketData] = React.useState<any>([]);
//   const [casinoData, setCasinoData] = React.useState<any>([]);
//   const [openMatch, setOpenMatch] = React.useState<string | null>(null);


//   const [filteredData, setFilteredData] = React.useState<any>([]);
//   const [startDate, setStartDate] = React.useState("");
//   const [endDate, setEndDate] = React.useState("");
//   const [matkaData, setMatkaData] = React.useState<any[]>([]);
// const [openMatkaRound, setOpenMatkaRound] = React.useState<string | null>(null);



//   React.useEffect(() => {
//     accountService.comgames().then((res: AxiosResponse) => {
//       console.log(res, "marketffffff data");
//       // setmarketData(res.data.data.matches ? res.data.data.matches.reverse() : []);
//       setmarketData(res?.data?.data?.matches ? res?.data?.data?.matches?.filter((match: any) => match?.bets && match?.bets?.length > 0).reverse()
//         : []
//       );
//       // setmarketData(res?.data?.data?.matches ? res?.data?.data?.matches?.filter((match:any) => match.bets && match.bets.length > 0).reverse()

//     });

//   }, []);


//   React.useEffect(() => {
//     accountService.comgamescasino().then((res: AxiosResponse) => {
//       console.log(res, "marketffffff data");
//       const allData = res?.data?.data?.bets?.reverse() || [];
//       setCasinoData(allData);
//       setFilteredData(allData); //
//     });

//   }, []);

//   React.useEffect(() => {
//   accountService.matkacomgames().then((res: AxiosResponse) => {
//     const bets = res?.data?.data?.Matkabets || [];
//     setMatkaData(bets);
//   });
// }, []);


// const groupedMatka = matkaData.reduce((acc: any, bet: any) => {
//   const key = bet.roundid; // 👈 roundid se grouping
//   if (!acc[key]) acc[key] = [];
//   acc[key].push(bet);
//   return acc;
// }, {});


//   const handleFilter = () => {
//     if (!startDate || !endDate) return;

//     const start = moment(startDate).startOf("day");
//     const end = moment(endDate).endOf("day");

//     const filtered = casinoData.filter((item: any) => {
//       const betTime = moment(item.betClickTime);
//       return betTime.isBetween(start, end, undefined, "[]"); // inclusive
//     });

//     setFilteredData(filtered);
//   };


//   console.log(marketData, "markettdatata")

//   const [expandedMatchId, setExpandedMatchId] = React.useState(null);

//   const handleMatchClick = (matchId: any) => {
//     setExpandedMatchId(prev => (prev === matchId ? null : matchId));
//   };


//   const [expandedSelection, setExpandedSelection] = React.useState<string | null>(null);


//   const groupedData = filteredData.reduce((acc: any, bet: any) => {
//     const key = bet.matchName;
//     if (!acc[key]) acc[key] = [];
//     acc[key].push(bet);
//     return acc;
//   }, {});

//   const getMatkaPL = (bet: any) => {
//   return Number(
//     bet.pl ??
//     bet.profitloss ??
//     bet.profitLoss ??
//     bet.pnl ??
//     0
//   );
// };


// //   const totalPL = bets.reduce(
// //   (sum: number, b: any) => sum + getMatkaPL(b),
// //   0
// // );


//   const [expandedMatches, setExpandedMatches] = React.useState<{ [key: string]: boolean }>({});

//   return (
//     <div><div className="body-wrap">
//       <div className="back-main-menu my-2">
//         <a href="/">BACK TO MAIN MENU</a>
//       </div>

//       {/* Example: If looping over data, replace this comment with mapped content */}

//       <div className="card-content">
//       <div className="">
//         <div className=" coupon-table mb-0 text-nowrap align-middle">
        
//           <div>
//             {marketData?.map((match: any, index: number) => {
//               const marketId =
//                 match?.markets && match?.markets?.length > 0
//                   ? match?.markets[0].marketId
//                   : null;
//               return (
//                 <div key={match.matchId}>
//                   <div  >


//                     <div className="container w-100 mt-2 p-0" >
//                       <div className="card single-match text-center my-2">
//                         <a>
//                           <h5 onClick={() => handleMatchClick(match.matchId)} className="ng-binding" style={{backgroundColor:"black"}}>{match.name}</h5>


//                           <div className='p-2'> <p className=" d-flex justify-content-between">
//                             <p>Start On</p>
//                             <p> {moment(match.matchDateTime).format(dateFormat)} </p>

//                           </p>

//                             <div className=" d-flex justify-content-between">
//                               <p>Total :{" "}</p>
//                               <p className={`${match?.bets?.reduce((acc: any, bet: any) => acc + Number(bet.profitLoss || 0), 0) >= 0 ? "text-success" : "text-danger"}`}>{match?.bets?.reduce((acc: any, bet: any) => acc + Number(bet.profitLoss || 0), 0).toFixed()} </p>
//                             </div>
//                           </div>
//                         </a>

//                         {/* Conditional Bets Details */}
//                         {expandedMatchId === match?.matchId && (
//                           <div className="p-2 border-top">
//                             <p className=" d-flex justify-content-between">
//                               <p>Declare On</p>
//                               <p> {moment(match?.matchDateTime).format(dateFormat)} </p>

//                             </p>
//                             {match?.bets?.length > 0 ? (() => {
//                               const groupedBets = match?.bets?.reduce((acc: any, item: any) => {
//                                 const name = item?.bet_on === "MATCH_ODDS" ? "Match" : item?.selectionName;
//                                 // const name = item?.selectionName;
//                                 if (!acc[name]) {
//                                   acc[name] = {
//                                     selectionName: name,
//                                     profitLoss: Number(item?.profitLoss || 0),
//                                   };
//                                 } else {
//                                   acc[name].profitLoss += Number(item?.profitLoss || 0);
//                                 }
//                                 return acc;
//                               }, {});

//                               const uniqueBets = Object.values(groupedBets);

//                               const totalProfitLoss: any = uniqueBets.reduce(
//                                 (acc: number, item: any) => acc + item?.profitLoss,
//                                 0
//                               );

//                               return (
//                                 <>
//                                   {uniqueBets?.map((item: any, index: number) => (
//                                     <div key={index} >
//                                       <div className="d-flex justify-content-between mt-2">
//                                         <div onClick={() => setExpandedSelection(prev => prev === item.selectionName ? null : item.selectionName)}><span className="text-primary">{item?.selectionName}</span>
//                                         </div>
//                                         <span className={item?.profitLoss >= 0 ? "text-success" : "text-danger"}>
//                                           {item?.profitLoss.toFixed()}
//                                         </span></div>

//                                       {expandedSelection === item?.selectionName && (() => {
//                                         // const betsForSelection = match?.bets?.filter((b: any) => b.selectionName === item.selectionName);
//                                         const betsForSelection = match?.bets?.filter((b: any) => {
//                                           const isMatchOdds = b?.bet_on === "MATCH_ODDS";
//                                           const selectionLabel = isMatchOdds ? "Match" : b?.selectionName;
//                                           return selectionLabel === item?.selectionName;
//                                         });
//                                         const marketName = betsForSelection?.[0]?.marketName ?? "";

//                                         return (
//                                           <div className="rounded border mt-2 w-100" style={{ background: "#f9f9f9" }}>
//                                             <div className="table-responsive" style={{ overflowX: 'scroll' , maxHeight: '400px', }}>

//                                               <table className="table table-sm table-bordered mb-0  text-nowrap align-middle">
//                                                 <thead className="table-secondary text-center"  style={{backgroundColor:"black"}}>
//                                                   <tr className="text-center">
//                                                     <th className='text-center text-white '>Date</th>

//                                                     <th className="px-3 py-2  text-white" >Event Id</th>
//                                                     <th className="px-3 py-2  text-white">-</th>


//                                                     {marketName === "Fancy" ? <th className="px-3 py-2  text-white">Yes/Not</th> : ""}
//                                                     <th className="px-3 py-2  text-white">Rate</th>


//                                                     <th className="px-3 py-2  text-white">Amount</th>
//                                                     <th className="px-3 py-2  text-white">PnL</th>



//                                                   </tr>
//                                                 </thead>
//                                                 <tbody>


//                                                   {betsForSelection
//                                                     ?.map((b: any, i: number) => (
//                                                       <tr key={i} className="text-center">
//                                                         <td className="px-3 py-2" style ={{height:"50px"}}>                                                                                {moment.utc(b?.betClickTime).format("MMMM Do, h:mm:ss A")}
//                                                         </td>
//                                                         <td className="px-3 py-2">{b?.selectionId}</td>
//                                                         {marketName === "Fancy" ?
//                                                           <td className="pt-2 pb-1 px-3 py-2 " >
//                                                             {b?.isBack ? (
//                                                               <button
//                                                                 className="btn-yes btn btn-sm p-1 ng-scope"
//                                                                 style={{ fontSize: "xx-small" }}
//                                                               >
//                                                                 <span
//                                                                   className="badge badge-light"
//                                                                   style={{ fontSize: "xx-small" }}
//                                                                 >
//                                                                   YES
//                                                                 </span>
//                                                               </button>
//                                                             ) : (
//                                                               <button
//                                                                 className="btn-not btn btn-sm p-1 ng-scope"
//                                                                 style={{ fontSize: "xx-small" }}
//                                                               >
//                                                                 <span
//                                                                   className="badge badge-light"
//                                                                   style={{ fontSize: "xx-small" }}
//                                                                 >
//                                                                   NOT
//                                                                 </span>
//                                                               </button>
//                                                             )}
//                                                           </td>

//                                                           :

//                                                           <td className="pt-2 pb-1 text-center px-3 py-2 d-flex justify-content-center">
//                                                             {b?.isBack ? (
//                                                               <button
//                                                                 className="btn btn-sm btn-yes d-flex align-items-center gap-2 w-auto px-2"
//                                                                 style={{ fontSize: "xx-small" }}
//                                                               >
//                                                                 <span className="badge bg-light text-dark" style={{ fontSize: "xx-small", marginInlineEnd: "2px" }}>
//                                                                   L
//                                                                 </span>
//                                                                 <span className="badge bg-light text-dark" style={{ fontSize: "xx-small" }}>
//                                                                   {b?.selectionName}
//                                                                 </span>
//                                                               </button>
//                                                             ) : (
//                                                               <button
//                                                                 className="btn btn-sm btn-not d-flex align-items-center gap-2 w-auto px-2"
//                                                                 style={{ fontSize: "xx-small" }}
//                                                               >
//                                                                 <span className="badge bg-light text-dark" style={{ fontSize: "xx-small", marginInlineEnd: "2px" }}>
//                                                                   K
//                                                                 </span>
//                                                                 <span className="badge bg-light text-dark" style={{ fontSize: "xx-small" }}>
//                                                                   {b?.selectionName}
//                                                                 </span>
//                                                               </button>
//                                                             )}
//                                                           </td>
//                                                         }



//                                                         {marketName === "Fancy" ? <td>{b.bet_on === "MATCH_ODDS" && b.marketName === "Bookmaker" ? b?.selectionName : b?.odds} </td> : ""}

//                                                         <td className='px-3 py-2'>{b.bet_on === "MATCH_ODDS" && b.marketName === "Bookmaker" ? b?.odds : b?.volume}</td>

//                                                         <td className='px-3 py-2'>{b?.stack}</td>
//                                                         <td className={b?.profitLoss >= 0 ? "text-success" : "text-danger"}>
//                                                           {b?.profitLoss.toFixed()}
//                                                         </td>
//                                                       </tr>
//                                                     ))}
//                                                 </tbody>
//                                               </table>
//                                             </div>

//                                           </div>


//                                         );

//                                       })()}





//                                     </div>


//                                   ))}

//                                   <div className="d-flex justify-content-between mt-2 border-top pt-2 fw-bold">
//                                     <span>Total</span>
//                                     <span className={totalProfitLoss >= 0 ? "text-success" : "text-danger"}>
//                                       {totalProfitLoss.toFixed()}
//                                     </span>
//                                   </div>
//                                 </>
//                               );
//                             })() : (
//                               <p>No bets found</p>
//                             )}


//                           </div>
//                         )}
//                       </div>
//                     </div>


//                   </div>

//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//       </div>


//       {/* <div className="back-main-menu my-2">
//         <a>Casino Completed Games</a>
//       </div> */}

//       {/* <div style={{ fontSize: "12px" }} className="d-flex gap-2 align-items-end mb-3  flex-wrap">
//                 <div className='me-1'>
//                     <label className="form-label mb-1 ">Start Date</label>
//                     <input
//                         type="date"
//                         value={startDate}
//                         className="form-control p-1"
//                         onChange={(e) => setStartDate(e.target.value)}
//                     />
//                 </div>
//                 <div className='me-1'>
//                     <label className="form-label mb-1">End Date</label>
//                     <input
//                         type="date"
//                         value={endDate}
//                         className="form-control p-1"
//                         onChange={(e) => setEndDate(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <button className="btn btn-primary" onClick={handleFilter}>
//                         Filter
//                     </button>
//                 </div>
//             </div> */}




//                  <div className="card-content w-100">
//                      <div className="table coupon-table">
//                          <div>
//                              {Object.entries(groupedData).map(([matchName, bets]: [string, any[]], i) => {
//                                  const totalPnL = bets.reduce((sum, b) => sum + b.profitLoss, 0);
//                                  const isPositive = totalPnL >= 0;
     
//                                  return (
//                                      <React.Fragment key={i}>
     
     
     
                                      
//                                                  <div className='container mt-2 p-0'>
//                                                      <div className='card single-match text-center my-2'>
//                                                          <a
//                                                              className=""
//                                                              style={{
//                                                                  cursor: "pointer",
//                                                                  backgroundColor: "#f8f9fa",
//                                                              }}
//                                                              onClick={() => setOpenMatch(openMatch === matchName ? null : matchName)}
//                                                          >
//                                                              <h5 className="mb-2 ng-binding"  style={{backgroundColor:"black"}}>{matchName}</h5>
     
//                                                              <div className="d-flex p-1 justify-content-between">
//                                                                  <p className="">Start On</p>
//                                                                  <p className="">
//                                                                      {
//                                                                          bets[0]?.betClickTime
//                                                                              ? moment.utc(bets[0].betClickTime).format("MM/DD/YYYY h:mm a")
//                                                                              : "-"
//                                                                      }
//                                                                  </p>
//                                                              </div>
     
//                                                              <div className="d-flex p-1 justify-content-between">
//                                                                  <p className="mb-0">Total PnL:</p>
//                                                                  <p
//                                                                      className={`mb-0 ${isPositive ? "text-success" : "text-danger"
//                                                                          } fw-bold`}
//                                                                  >
//                                                                      {totalPnL.toFixed(2)}
//                                                                  </p>
//                                                              </div>
     
     
     
//                                                                                                                  {openMatch === matchName && (() => {
//                                                                  // Move this to your component scope (not here inside JSX)
                                                            
//                                                                  const isExpanded = expandedMatches[matchName] || false;
//                                                                  const displayedBets = isExpanded ? bets : bets.slice(0, 20);
                                                                 
                                                            
//                                                                 return (
//                                                                     <div>
//                                                                         <div className="table-responsive" style={{ overflowX: 'scroll' }}>
//                                                                             <div style={{ minWidth: '750px' }}>
//                                                                                 <table className="table table-sm table-striped table-bordered mb-0 text-nowrap">
//                                                                                     <thead className="table-secondary text-center fs-6"  style={{backgroundColor:"black", color:"white"}}>
//                                                                                         <tr>
//                                                                                             <th className='text-center text-white'>Username</th>
//                                                                                             <th className='text-center text-white'>Type</th>
//                                                                                             <th className='text-center text-white'>Rate</th>
//                                                                                             <th className='text-center text-white'>Amount</th>
//                                                                                             <th className='text-center text-white'>PnL</th>
//                                                                                             <th className='text-center text-white'>Status</th>
//                                                                                             <th className='text-center text-white'>Date/Time</th>
//                                                                                         </tr>
//                                                                                     </thead>
//                                                                                     <tbody>
//                                                                                         {displayedBets?.map((b: any, j: number) => (
//                                                                                             <tr key={j} className="text-center align-middle fs-6" style ={{height:"50px"}}>
//                                                                                                 <td>{b?.userName} ({b?.parentNameStr})</td>
//                                                                                                 <td>{b?.selectionName}</td>
//                                                                                                 <td>{b?.odds}</td>
//                                                                                                 <td>{b?.stack}</td>
//                                                                                                 <td className={b?.profitLoss >= 0 ? "text-success" : "text-danger"}>
//                                                                                                     {b?.profitLoss.toFixed(2)}
//                                                                                                 </td>
//                                                                                                 <td>
//                                                                                                     <span className={`badge rounded-pill text-light ${b?.profitLoss >= 0 ? "bg-success" : "bg-danger"}`}>
//                                                                                                         {b?.profitLoss >= 0 ? "Win" : "Lost"}
//                                                                                                     </span>
//                                                                                                 </td>
//                                                                                                 <td>{moment.utc(b?.betClickTime).format("MM/DD/YYYY h:mm:ss a")}</td>
//                                                                                             </tr>
//                                                                                         ))}
//                                                                                     </tbody>
//                                                                                 </table>
//                                                                             </div>
                                                            
//                                                                             {bets.length > 20 && (
//                                                                             <div className="text-center mt-2">
//                                                                                 <button
//                                                                 className="btn btn-sm btn-primary text-light"
//                                                                 onClick={(e) => {
//                                                                     e.stopPropagation(); // prevent closing match on button click
//                                                                     setExpandedMatches(prev => ({
//                                                                         ...prev,
//                                                                         [matchName]: !isExpanded
//                                                                     }));
//                                                                 }}
//                                                             >
//                                                                 {isExpanded ? "View Less" : "View All"}
//                                                             </button>
//                                                                             </div>
//                                                                         )}
//                                                                         </div>
                                                            
                                                                        
//                                                                     </div>
//                                                                 );
//                                                             })()}
//                                                          </a>
//                                                      </div>
//                                                  </div>
     
                                        
     
     
     
     
//                                          {/* Expanded Details */}
     
//                                      </React.Fragment>
//                                  );
//                              })}
//                          </div>
//                      </div>
//                  </div>


//               <div className="card-content w-100">
//   <div className="coupon-table">
//     {Object.entries(groupedMatka).map(
//       ([roundid, bets]: [string, any[]], i) => {
//         const totalPL = bets.reduce(
//           (sum, b) => sum + getMatkaPL(b),
//           0
//         );

//         return (
//           <div key={i} className="container mt-2 p-0">
//             <div className="card single-match text-center my-2">
//               <div
//                 style={{ cursor: "pointer" }}
//                 onClick={() =>
//                   setOpenMatkaRound(
//                     openMatkaRound === roundid ? null : roundid
//                   )
//                 }
//               >
//                 <h5 style={{ background: "black", color: "white" }}>
//                   {roundid}
//                 </h5>

//                 <div className="d-flex justify-content-between p-2">
//                   <span>Total Bets: {bets.length}</span>
//                   <span
//                     className={
//                       totalPL >= 0 ? "text-success" : "text-danger"
//                     }
//                   >
//                     {totalPL.toFixed(2)}
//                   </span>
//                 </div>
//               </div>

//               {/* EXPANDED TABLE */}
//               {openMatkaRound === roundid && (
//                 <div
//                   style={{
//                     overflowX: "auto",
//                     maxHeight: "300px",
//                     overflowY: "auto",
//                   }}
//                 >
//                   <table className="table table-sm table-bordered text-nowrap">
//                     <thead style={{  color: "white" }}>
//                       <tr >
//                         <th>Selection</th>
//                         <th>Type</th>
//                         <th>Odds</th>
//                         <th>Amount</th>
//                         <th>P/L</th>
//                         <th>Date</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {bets.map((b: any, j: number) => {
//                         const pl = getMatkaPL(b);
//                         return (
//                           <tr key={j} className="text-center" style ={{height:"50px"}}>
//                             <td>{b.selectionId}</td>
//                             <td>{b.bettype}</td>
//                             <td>{b.odds}</td>
//                             <td>{b.betamount}</td>
//                             <td
//                               className={
//                                 pl >= 0
//                                   ? "text-success"
//                                   : "text-danger"
//                               }
//                             >
//                               {pl.toFixed(2)}
//                             </td>
//                             <td>
//                               {moment(b.createdAt).format(
//                                 "DD/MM/YYYY HH:mm"
//                               )}
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </div>
//         );
//       }
//     )}
//   </div>
// </div>





//       <div className="back-main-menu my-2">
//         <a href="/">BACK TO MAIN MENU</a>
//       </div>
//     </div></div>
//   )
// }

// export default Completegames



import React from 'react'
import "./newprofile.css"
import accountService from '../../services/account.service';
import { AxiosResponse } from 'axios';
import moment from 'moment-timezone';
import { dateFormat } from '../../utils/helper';

const Completegames = () => {
  const [marketData,    setMarketData]    = React.useState<any[]>([]);
  const [casinoData,    setCasinoData]    = React.useState<any[]>([]);
  const [matkaData,     setMatkaData]     = React.useState<any[]>([]);

  // ── FIX 2: Alag loading states ───────────────────────────────────────────
  const [sportsLoading, setSportsLoading] = React.useState(true);
  const [casinoLoading, setCasinoLoading] = React.useState(false);
  const [matkaLoading,  setMatkaLoading]  = React.useState(false);

  const [openMatchId,    setOpenMatchId]    = React.useState<string | null>(null);
  const [openMatch,      setOpenMatch]      = React.useState<string | null>(null);
  const [openMatkaRound, setOpenMatkaRound] = React.useState<string | null>(null);
  const [expandedSel,    setExpandedSel]    = React.useState<string | null>(null);
  const [expandedMatches, setExpandedMatches] = React.useState<{ [k: string]: boolean }>({});

  const [activeTab, setActiveTab] = React.useState<'sports' | 'casino' | 'matka'>('sports');
  const casinoLoaded = React.useRef(false);
  const matkaLoaded  = React.useRef(false);

  // ── Sports — load immediately ─────────────────────────────────────────────
  React.useEffect(() => {
    setSportsLoading(true);
    accountService.comgames()
      .then((res: AxiosResponse) => {
        setMarketData(
          res?.data?.data?.matches
            ?.filter((m: any) => m?.bets?.length > 0)
            ?.reverse() || []
        );
      })
      .finally(() => setSportsLoading(false));
  }, []);

  // ── Casino — load only when tab clicked ──────────────────────────────────
  React.useEffect(() => {
    if (activeTab !== 'casino' || casinoLoaded.current) return;
    casinoLoaded.current = true;
    setCasinoLoading(true);
    accountService.comgamescasino()
      .then((res: AxiosResponse) => {
        setCasinoData(res?.data?.data?.bets?.reverse() || []);
      })
      .finally(() => setCasinoLoading(false));
  }, [activeTab]);

  // ── Matka — load only when tab clicked ───────────────────────────────────
  React.useEffect(() => {
    if (activeTab !== 'matka' || matkaLoaded.current) return;
    matkaLoaded.current = true;
    setMatkaLoading(true);
    accountService.matkacomgames()
      .then((res: AxiosResponse) => {
        setMatkaData(res?.data?.data?.Matkabets || []);
      })
      .finally(() => setMatkaLoading(false));
  }, [activeTab]);

  // ── FIX 1: Dead imports hataye, grouping memoized ────────────────────────
  const groupedCasino = React.useMemo(() =>
    casinoData.reduce((acc: any, bet: any) => {
      const key = bet.matchName;
      if (!acc[key]) acc[key] = [];
      acc[key].push(bet);
      return acc;
    }, {}),
  [casinoData]);

  const groupedMatka = React.useMemo(() =>
    matkaData.reduce((acc: any, bet: any) => {
      const key = bet.roundid;
      if (!acc[key]) acc[key] = [];
      acc[key].push(bet);
      return acc;
    }, {}),
  [matkaData]);

  // ── FIX 3: useCallback se har render pe recreate nahi hoga ───────────────
  const getMatkaPL = React.useCallback((bet: any) =>
    Number(bet.pl ?? bet.profitloss ?? bet.profitLoss ?? bet.pnl ?? 0),
  []);

  return (
    <div>
      <div className="body-wrap">
        <div className="back-main-menu my-2">
          <a href="/">BACK TO MAIN MENU</a>
        </div>

        {/* ── Tab switcher ─────────────────────────────────────────────────── */}
        <div className="d-flex gap-2 p-2">
          {(['sports', 'casino', 'matka'] as const).map(tab => (
            <button
              key={tab}
              className={`btn btn-sm ${activeTab === tab ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            TAB 1 — SPORTS
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'sports' && (
          <div className="card-content">
            <div className="coupon-table mb-0 text-nowrap align-middle">

              {/* FIX 2: Loading / empty alag alag ──────────────────────── */}
              {sportsLoading && <p className="p-3">Loading...</p>}
              {!sportsLoading && marketData.length === 0 && (
                <p className="p-3">No completed matches found.</p>
              )}

              {!sportsLoading && marketData.map((match: any) => {
                const totalPL = match?.bets?.reduce(
                  (acc: number, bet: any) => acc + Number(bet.profitLoss || 0), 0
                );
                return (
                  <div key={match.matchId} className="container w-100 mt-2 p-0">
                    <div className="card single-match text-center my-2">

                      {/* Match header */}
                      <h5
                        onClick={() => setOpenMatchId(prev => prev === match.matchId ? null : match.matchId)}
                        className="ng-binding mb-0"
                        style={{ backgroundColor: "black", cursor: "pointer" }}
                      >
                        {match.name}
                      </h5>
                      <div className="p-2">
                        <div className="d-flex justify-content-between">
                          <span>Start On</span>
                          <span>{moment(match.matchDateTime).format(dateFormat)}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>Total:</span>
                          <span className={totalPL >= 0 ? "text-success" : "text-danger"}>
                            {totalPL.toFixed()}
                          </span>
                        </div>
                      </div>

                      {/* Expanded bets */}
                      {openMatchId === match.matchId && (() => {
                        const groupedBets = match.bets.reduce((acc: any, item: any) => {
                          const name = item?.bet_on === "MATCH_ODDS" ? "Match" : item?.selectionName;
                          if (!acc[name]) acc[name] = { selectionName: name, profitLoss: 0 };
                          acc[name].profitLoss += Number(item?.profitLoss || 0);
                          return acc;
                        }, {});
                        const uniqueBets: any[] = Object.values(groupedBets);
                        const totalPLGroup = uniqueBets.reduce((a, b: any) => a + b.profitLoss, 0);

                        return (
                          <div className="p-2 border-top">
                            <div className="d-flex justify-content-between">
                              <span>Declare On</span>
                              <span>{moment(match.matchDateTime).format(dateFormat)}</span>
                            </div>

                            {uniqueBets.map((item: any, idx: number) => (
                              <div key={idx}>
                                <div className="d-flex justify-content-between mt-2">
                                  <span
                                    className="text-primary"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setExpandedSel(prev => prev === item.selectionName ? null : item.selectionName)}
                                  >
                                    {item.selectionName}
                                  </span>
                                  <span className={item.profitLoss >= 0 ? "text-success" : "text-danger"}>
                                    {item.profitLoss.toFixed()}
                                  </span>
                                </div>

                                {/* Bet detail table */}
                                {expandedSel === item.selectionName && (() => {
                                  const selBets = match.bets.filter((b: any) => {
                                    const label = b?.bet_on === "MATCH_ODDS" ? "Match" : b?.selectionName;
                                    return label === item.selectionName;
                                  });
                                  const marketName = selBets[0]?.marketName ?? "";
                                  return (
                                    <div className="table-responsive mt-2" style={{ overflowX: 'scroll', maxHeight: '400px' }}>
                                      <table className="table table-sm table-bordered mb-0 text-nowrap align-middle">
                                        <thead style={{ backgroundColor: "black" }}>
                                          <tr className="text-center">
                                            <th className="text-white">Date</th>
                                            <th className="text-white">Event Id</th>
                                            <th className="text-white">-</th>
                                            {marketName === "Fancy" && <th className="text-white">Yes/No</th>}
                                            <th className="text-white">Rate</th>
                                            <th className="text-white">Amount</th>
                                            <th className="text-white">PnL</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {selBets.map((b: any, i: number) => (
                                            <tr key={i} className="text-center" style={{ height: "50px" }}>
                                              <td>{moment.utc(b?.betClickTime).format("MMMM Do, h:mm:ss A")}</td>
                                              <td>{b?.selectionId}</td>
                                              <td>
                                                {b?.isBack ? (
                                                  <button className="btn-yes btn btn-sm p-1">
                                                    <span className="badge badge-light" style={{ fontSize: "xx-small" }}>
                                                      {marketName === "Fancy" ? "YES" : `L ${b?.selectionName}`}
                                                    </span>
                                                  </button>
                                                ) : (
                                                  <button className="btn-not btn btn-sm p-1">
                                                    <span className="badge badge-light" style={{ fontSize: "xx-small" }}>
                                                      {marketName === "Fancy" ? "NOT" : `K ${b?.selectionName}`}
                                                    </span>
                                                  </button>
                                                )}
                                              </td>
                                              {marketName === "Fancy" && (
                                                <td>{b.bet_on === "MATCH_ODDS" && b.marketName === "Bookmaker" ? b?.selectionName : b?.odds}</td>
                                              )}
                                              <td>{b.bet_on === "MATCH_ODDS" && b.marketName === "Bookmaker" ? b?.odds : b?.volume}</td>
                                              <td>{b?.stack}</td>
                                              <td className={b?.profitLoss >= 0 ? "text-success" : "text-danger"}>
                                                {b?.profitLoss.toFixed()}
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  );
                                })()}
                              </div>
                            ))}

                            <div className="d-flex justify-content-between mt-2 border-top pt-2 fw-bold">
                              <span>Total</span>
                              <span className={totalPLGroup >= 0 ? "text-success" : "text-danger"}>
                                {totalPLGroup.toFixed()}
                              </span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            TAB 2 — CASINO
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'casino' && (
          <div className="card-content w-100">
            <div className="coupon-table">

              {/* FIX 2: Casino loading / empty ─────────────────────────── */}
              {casinoLoading && <p className="p-3">Loading casino data...</p>}
              {!casinoLoading && casinoData.length === 0 && (
                <p className="p-3">No casino data found.</p>
              )}

              {!casinoLoading && Object.entries(groupedCasino).map(([matchName, bets]: [string, any[]], i) => {
                const totalPnL = bets.reduce((sum, b) => sum + b.profitLoss, 0);
                const isExpanded = expandedMatches[matchName] || false;
                const displayedBets = isExpanded ? bets : bets.slice(0, 20);

                return (
                  <div key={i} className="container mt-2 p-0">
                    <div className="card single-match text-center my-2">
                      <h5
                        className="mb-0 ng-binding"
                        style={{ backgroundColor: "black", cursor: "pointer" }}
                        onClick={() => setOpenMatch(prev => prev === matchName ? null : matchName)}
                      >
                        {matchName}
                      </h5>
                      <div className="d-flex p-2 justify-content-between">
                        <span>Start On</span>
                        <span>
                          {bets[0]?.betClickTime
                            ? moment.utc(bets[0].betClickTime).format("MM/DD/YYYY h:mm a")
                            : "-"}
                        </span>
                      </div>
                      <div className="d-flex p-1 justify-content-between">
                        <span>Total PnL:</span>
                        <span className={`fw-bold ${totalPnL >= 0 ? "text-success" : "text-danger"}`}>
                          {totalPnL.toFixed(2)}
                        </span>
                      </div>

                      {openMatch === matchName && (
                        <div className="table-responsive" style={{ overflowX: 'scroll' }}>
                          <table className="table table-sm table-striped table-bordered mb-0 text-nowrap">
                            <thead style={{ backgroundColor: "black" }}>
                              <tr>
                                {['Username', 'Type', 'Rate', 'Amount', 'PnL', 'Status', 'Date/Time'].map(h => (
                                  <th key={h} className="text-center text-white">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {displayedBets.map((b: any, j: number) => (
                                <tr key={j} className="text-center align-middle" style={{ height: "50px" }}>
                                  <td>{b?.userName} ({b?.parentNameStr})</td>
                                  <td>{b?.selectionName}</td>
                                  <td>{b?.odds}</td>
                                  <td>{b?.stack}</td>
                                  <td className={b?.profitLoss >= 0 ? "text-success" : "text-danger"}>
                                    {b?.profitLoss.toFixed(2)}
                                  </td>
                                  <td>
                                    <span className={`badge rounded-pill text-light ${b?.profitLoss >= 0 ? "bg-success" : "bg-danger"}`}>
                                      {b?.profitLoss >= 0 ? "Win" : "Lost"}
                                    </span>
                                  </td>
                                  <td>{moment.utc(b?.betClickTime).format("MM/DD/YYYY h:mm:ss a")}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>

                          {bets.length > 20 && (
                            <div className="text-center mt-2">
                              <button
                                className="btn btn-sm btn-primary"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedMatches(prev => ({ ...prev, [matchName]: !isExpanded }));
                                }}
                              >
                                {isExpanded ? "View Less" : "View All"}
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            TAB 3 — MATKA
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'matka' && (
          <div className="card-content w-100">
            <div className="coupon-table">

              {/* FIX 2: Matka loading / empty ──────────────────────────── */}
              {matkaLoading && <p className="p-3">Loading matka data...</p>}
              {!matkaLoading && matkaData.length === 0 && (
                <p className="p-3">No matka data found.</p>
              )}

              {!matkaLoading && Object.entries(groupedMatka).map(([roundid, bets]: [string, any[]], i) => {
                const totalPL = bets.reduce((sum, b) => sum + getMatkaPL(b), 0);
                return (
                  <div key={i} className="container mt-2 p-0">
                    <div className="card single-match text-center my-2">
                      <h5
                        style={{ background: "black", color: "white", cursor: "pointer" }}
                        onClick={() => setOpenMatkaRound(prev => prev === roundid ? null : roundid)}
                      >
                        {roundid}
                      </h5>
                      <div className="d-flex justify-content-between p-2">
                        <span>Total Bets: {bets.length}</span>
                        <span className={totalPL >= 0 ? "text-success" : "text-danger"}>
                          {totalPL.toFixed(2)}
                        </span>
                      </div>

                      {openMatkaRound === roundid && (
                        <div style={{ overflowX: "auto", maxHeight: "300px", overflowY: "auto" }}>
                          <table className="table table-sm table-bordered text-nowrap">
                            <thead style={{ backgroundColor: "black", color: "white" }}>
                              <tr>
                                {['Selection', 'Type', 'Odds', 'Amount', 'P/L', 'Date'].map(h => (
                                  <th key={h}>{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {bets.map((b: any, j: number) => {
                                const pl = getMatkaPL(b);
                                return (
                                  <tr key={j} className="text-center" style={{ height: "50px" }}>
                                    <td>{b.selectionId}</td>
                                    <td>{b.bettype}</td>
                                    <td>{b.odds}</td>
                                    <td>{b.betamount}</td>
                                    <td className={pl >= 0 ? "text-success" : "text-danger"}>
                                      {pl.toFixed(2)}
                                    </td>
                                    <td>{moment(b.createdAt).format("DD/MM/YYYY HH:mm")}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="back-main-menu my-2">
          <a href="/">BACK TO MAIN MENU</a>
        </div>
      </div>
    </div>
  );
};

export default Completegames;
