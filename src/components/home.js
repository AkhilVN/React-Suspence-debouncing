
import { useState, Suspense } from "react";
import { fetchPostalData } from "./api";
import DataTable from "./dataTable";
import LottieControl from "./lottie";
const initialData = fetchPostalData()
function Home() {
    const [data, setData] = useState(initialData)

    function debounce(func, timeout = 1000){
        let timer;
        return (...args) => {
          timer && clearTimeout(timer);
          timer = setTimeout(() => { 
            func.apply(this, args); 
            },
            timeout);
        };
    }


    const fetchData = async(e) => {
        const value = e.target.value
        const regex_pincode=/^\d{6}$/;
        const regex_postOffice = /^[a-zA-Z\s]+$/

        if(regex_pincode.test(value) || regex_postOffice.test(value)){
            setData(fetchPostalData(value))
        }
    }
    
  return (
    <div style={{display:'flex'}}>
        <div style={{minWidth:'50%',maxWidth:'50%', minHeight:'100vh',maxHeight:'100vh'}}>
            <h2>Postal PIN Code App</h2>
            <h4>Search for any indian pincode or place</h4>
            <LottieControl/>
        </div>
        <div style={{minWidth:'50%',maxWidth:'50%', minHeight:'100vh', maxHeight:'100vh', background:'skyblue'}}>
            <input type="text" placeholder="Enter the Pincode or place"  onChange={debounce(fetchData)}/>
            <Suspense
            fallback={
                <div style={{display:'flex', justifyContent:'center', marginTop:'20px'}}>
                    <div className="spinner"></div>
                </div>
            }
            >
            <DataTable resource={data} />
            </Suspense>
        </div>
        
    </div>
  );
}

export default Home;
