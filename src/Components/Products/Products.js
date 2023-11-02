import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product/Product";

const categoryList = [
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
  "home-decoration",
  "furniture",
  "tops",
  "womens-dresses",
  "womens-shoes",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "womens-watches",
  "womens-bags",
  "womens-jewellery",
  "sunglasses",
  "automotive",
  "motorcycle",
  "lighting",
];

const prices = [
  "100 - 500",
  "500 - 1000",
  "1000 - 1500",
  "1500 - 2000",
  "2000 More",
];

const Products = () => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [startCount, setStartCount] = useState(0);
  const [endCount, setEndCount] = useState(8);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const productPerpage = 8;

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setAllProducts(data.products);
        setOriginalProducts(data.products);
        setTotalPage(Math.ceil(data.products.length / productPerpage));
      });
  }, [isLoading]);

  // Filter Products
  const handleFilter = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    // Filter By category
    if (name === "category") {
      console.log(value, name, "dddddddddddd");
      fetch(`https://dummyjson.com/products/category/${value}`)
        .then((res) => res.json())
        .then((data) => {
          setAllProducts(data.products);
          setIsLoading(false);
        });
      return;
    }
    // serach by title
    if (name === "searchTitle") {
      const filteredProductByTitle = originalProducts.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setAllProducts(filteredProductByTitle);
      return;
    }
    // Sort by price (the below code could be more simple based on data structure)
    const priceRange = value.includes("More")
      ? value.split(" ")
      : value.split("-");

    const filterProductByPrice = originalProducts.filter((item) => {
      if (priceRange.includes("More")) {
        return item.price > parseInt(priceRange[0]);
      }
      return item.price > parseInt(priceRange[0]) && item.price < priceRange[1];
    });
    setAllProducts(filterProductByPrice);

    // Search products by title
    console.log(name, value);
  };

  // Pagination
  const handlePagination = (e) => {
    const value = e.target.innerText;
    /*
    - Below these two variables type converts for number 
    paginations button so that it can visulize per page 8 products.
    - Pagination implementing is possible from backend site that's will be wise case.
    - pagination will be shown when the allProducts has more than 8 products.
    */
    const makeStartNumber = parseInt(value - 1);
    const emdNumber = parseInt(value);

    if (value === "Previous" && startCount >= productPerpage) {
      setStartCount((prev) => prev - productPerpage);
      setEndCount((prev) => prev - productPerpage);
    }
    if (value === "Next" && startCount <= allProducts.length) {
      setStartCount((prev) => prev + productPerpage);
      setEndCount((prev) => prev + productPerpage);
    }
    if (value === "1") {
      setStartCount(productPerpage * 0);
      setEndCount(productPerpage);
    }
    if (value === "2") {
      setStartCount(productPerpage * makeStartNumber);
      setEndCount(productPerpage * emdNumber);
    }
    if (value === "3") {
      setStartCount(productPerpage * makeStartNumber);
      setEndCount(productPerpage * emdNumber);
    }
    if (value === "4") {
      setStartCount(productPerpage * makeStartNumber);
      setEndCount(productPerpage * emdNumber);
    }
    setOriginalProducts(allProducts);
  };

  return (
    <MainContainer>
      <FilterBox>
        <div>
          <label>Filter Products By</label>
        </div>
        <div className="filter-items">
          <div className="category">
            <select defaultValue="" name="category" onChange={handleFilter}>
              <option className="hidden" value="">
                Category
              </option>
              {categoryList.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="price">
            <select defaultValue="" name="prices" onChange={handleFilter}>
              <option className="hidden" value="">
                Prices
              </option>
              {prices.map((item, index) => (
                <option key={index} value={item}>
                  ${item}
                </option>
              ))}
            </select>
          </div>
          <div className="searchTitle">
            <input
              type="text"
              name="searchTitle"
              defaultValue=""
              onChange={handleFilter}
              placeholder="Search"
            />
          </div>
        </div>
      </FilterBox>
      {isLoading && <CustomSpinner className="spinner"></CustomSpinner>}

      <CustomGrid>
        {allProducts.length < productPerpage
          ? allProducts.map((item) => <Product key={item.id} products={item} />)
          : allProducts.slice(startCount, endCount)?.map((item) => {
              return <Product key={item.id} products={item} />;
            })}
      </CustomGrid>
      {allProducts.length > productPerpage && (
        <PaginationBox>
          <button type="button" onClick={handlePagination}>
            Previous
          </button>
          {[...Array(totalPage).keys()].map((item) => (
            <button type="button" key={item} onClick={handlePagination}>
              {item + 1}
            </button>
          ))}
          <button type="button" onClick={handlePagination}>
            Next
          </button>
        </PaginationBox>
      )}
    </MainContainer>
  );
};

export default Products;

const MainContainer = styled.div`
  width: 85%;
  margin: 40px auto;
  @media only screen and (max-width: 590px) {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 20px;
  }
`;

const CustomGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  @media only screen and (max-width: 990px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (max-width: 660px) {
    grid-template-columns: repeat(1, 1fr);
    .product-image {
      object-fit: cover;
    }
  }
`;

const FilterBox = styled.div`
  margin: 10px 0px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background-color: #fab675;
  padding: 10px 7px;
  border-radius: 3px;

  label {
    display: block;
    font-size: 20px;
    margin-bottom: 10px;
  }

  .filter-items {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 4px;
    @media only screen and (max-width: 690px) {
      flex-wrap: wrap;
      align-items: flex-start;
    }
    > div {
      margin: 5px 10px;
    }
    select,
    input {
      width: 180px;
      height: 40px;
      border-radius: 5px;
      font-size: 16px;
      text-transform: capitalize;
    }

    input {
      height: 37px;
      border: 0;
      outline: 0;
      padding-left: 5px;
      border: 1px solid rgba(0, 0, 0, 0.6);
    }

    .hidden {
      display: none;
    }
  }
`;

const PaginationBox = styled.div`
  margin-top: 30px;
  background-color: #fab675;
  border-radius: 5px;
  button {
    background-color: #fab675;
    border: 0;
    color: #000000;
    font-size: 15px;
    margin: 10px 10px;
    padding: 0px 5px;
    cursor: pointer;
    font-weight: bold;
  }
`;
const CustomSpinner = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 auto;
  border: 4px solid rgba(0, 0, 0, 0.2);
  border-top: 4px solid black;
  border-radius: 50%;
  animation: mySpin 1s linear infinite;

  @keyframes mySpin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
