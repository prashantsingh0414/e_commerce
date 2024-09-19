

import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';

const DetailProduct = () => {
    const { id } = useParams();
    const { productsApi } = useContext(GlobalState);
    const [productDetail, setProductDetail] = useState(null);

    useEffect(() => {
        const fetchProductDetail = () => {
            if (id && Array.isArray(productsApi.products) && productsApi.products.length > 0) {
                const productsArray = productsApi.products[0];
                const foundProduct = productsArray.find(product => product._id === id);
                setProductDetail(foundProduct || null);
            }
        };

        if (productsApi && Array.isArray(productsApi.products)) {
            fetchProductDetail();
        }
    }, [id, productsApi]);

    console.log('Product Detail:', productDetail);

    return (
        <div className='detail'>
           
            <img src={productDetail?.images} alt=''   />
            <div className='box-detail'>
                <div className='row'>
                    <h2>{productDetail?.title}</h2>
                    <h6>{productDetail?.product_id}</h6>
                </div>
                <span>${productDetail?.price}</span>
                <p>{productDetail?.description}</p>
                <p>{productDetail?.content}</p>
                <p>Sold: {productDetail?.sold}</p>
                <Link to='/cart' className='cart'>Buy Now</Link>
            </div>
        </div>
    );
};

export default DetailProduct;
