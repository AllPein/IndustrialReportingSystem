import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, itemsSelector } from '../../store/modules/items';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const items = useSelector(itemsSelector);

  useEffect(() => {
    dispatch(fetchItems());
  }, []);


  return (
    <>
    {items.map(item => (
      <h1>{JSON.stringify(new Date(item.departureAt))}</h1>
    ))}
    </>
  );
}

export default Home;
