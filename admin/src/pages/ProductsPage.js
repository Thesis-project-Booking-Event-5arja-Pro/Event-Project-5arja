// import { Helmet } from 'react-helmet-async';
// import { useState } from 'react';
// // @mui
// import { Container, Stack, Typography } from '@mui/material';
// // components
// import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// // mock
// import PRODUCTS from '../_mock/products';

// // ----------------------------------------------------------------------

// export default function ProductsPage() {
//   const [openFilter, setOpenFilter] = useState(false);

//   const handleOpenFilter = () => {
//     setOpenFilter(true);
//   };

//   const handleCloseFilter = () => {
//     setOpenFilter(false);
//   };

//   return (
//     <>
//       <Helmet>
//         <title> Dashboard: Products | Minimal UI </title>
//       </Helmet>

//       <Container>
//         <Typography variant="h4" sx={{ mb: 5 }}>
//           Products
//         </Typography>

//         <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
//           <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
//             <ProductFilterSidebar
//               openFilter={openFilter}
//               onOpenFilter={handleOpenFilter}
//               onCloseFilter={handleCloseFilter}
//             />
//             <ProductSort />
//           </Stack>
//         </Stack>

//         <ProductList products={PRODUCTS} />
//         <ProductCartWidget />
//       </Container>
//     </>
//   );
// }
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import "./product.css"

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  // const [toglle,handleToglle]=
const navigate=useNavigate()
 
  useEffect(() => {
axios.get("http://localhost:5001/api/event/getAllevent").then(res=>setProducts(res.data)).catch(err => console.log(err))

    // fetch('http://localhost:5002/api/event/getAllevent')
    //   .then((res) => setProducts(res.data))
    //   .catch((error) => console.log(error));
  }, [products]);// Empty dependency array ensures the effect runs only once on mount
console.log(products,'helo');
const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5001/api/event/${id}`);
    
  } catch (err) {
    console.log(err);
  }
};
const handleUpdate = (id) => {
  navigate(`/dashboard/update/${id}`);
};

console.log(products);
  return (
    
    <div className="product-page">
      <div className='but'><button className="buttonn" onClick={() => navigate("/Add")}>Add product</button>
   
  </div>
      
    
    {products.map(event => (
      <div className="event-box" key={event.event_id}>
        <h2 className='name'>{event.title}</h2>
        <img src={event.img} alt="Event" />
        <p>Price: ${event.price}</p>
        <button className="delete" onClick={() => handleDelete(event.id)}>Delete</button>
        <button className="update" onClick={() => handleUpdate(event.id)}>Update</button>
      </div>
    ))}
  </div>
  
  );
};

export default ProductsPage;
;
