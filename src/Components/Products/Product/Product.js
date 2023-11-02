import React from "react";
import styled, { keyframes } from "styled-components";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { bounce, bounceIn, fadeIn, zoomIn } from "react-animations";

// Animation
const zooomInAnimation = keyframes`${zoomIn}`;

const Product = ({ products }) => {
  const { thumbnail, title, description, price } = products;
  return (
    <ProductCard>
      <div className="image">
        <img
          className="product-image"
          height="100%"
          width="100%"
          src={thumbnail}
          alt=""
        />
        <div className="overlay">
          <FontAwesomeIcon icon={faCartShopping} size="xl" color="#ffffff" />
        </div>
      </div>
      <div className="content">
        <h2>{title}</h2>
        <span className="price">$ {price}</span>
        <p>{description}</p>
      </div>
    </ProductCard>
  );
};

const ProductCard = styled.div`
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.3);
  animation: ${zooomInAnimation} 0.7s ease-in-out;
  .image {
    height: 250px;
    position: relative;
    overflow: hidden;
    transition: 0.5s all ease-in;
  }
  .image .overlay {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    transition: 0.3s all ease-in;
    background-color: rgba(0, 0, 0, 0.7);
    opacity: 0;

    svg {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: 0.2s all ease-in;
      cursor: pointer;
      :hover {
        color: #fab675;
      }
    }
  }

  .image:hover img {
    transform: scale(1.3);
  }

  .image:hover .overlay {
    opacity: 1;
    svg {
      opacity: 1;
      top: 50%;
    }
  }

  img {
    object-fit: cover;
    transition: 0.4s all ease;
  }
  .content {
    font-family: sans-serif;
    padding: 0px 10px;
    padding-bottom: 10px;
    h2 {
      font-size: 16px;
    }
    .price {
      font-weight: bold;
    }
    p {
      font-size: 14px;
    }
  }
`;

export default Product;
