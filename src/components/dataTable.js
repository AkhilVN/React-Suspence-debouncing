function DataTable({resource}) {
    const user = resource.user.read();
    const tableData = () => {
        if(user[0].PostOffice){
            return user[0]?.PostOffice?.map((e)=>
            <tr>
                <td>{e.Name}</td>
                <td>{e.Pincode}</td>
                <td>{e.Division}</td>
                <td>{e.District}</td>
                <td>{e.State}</td>
            </tr>
         )
        }
        
    }
  return (
    <div style={{maxHeight:'70vh', overflowY:'auto'}}>
        {user[0].PostOffice ? <table>
            <thead>
                <th>Name</th>
                <th>Pincode</th>
                <th>Division</th>
                <th>District</th>
                <th>State</th>
            </thead>
            {tableData()}
        </table> : <h1>No Records found</h1>}
    </div>
  );
}

export default DataTable;
