import React, { useEffect } from 'react';
import { useStoreContext } from "../../utils/GlobalState";
import { useQuery } from '@apollo/react-hooks';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import { QUERY_CATEGORIES } from "../../utils/queries";

function CategoryMenu({ setCategory }) {
  //calls useStoreContext() hook to retrieve the current state from the global state
  //object and the disptach() method to update state
  const [state, dispatch] = useStoreContext();

  //destructuring state to only grab categories out of state
  const { categories } = state;

  const { data: categoryData } = useQuery(QUERY_CATEGORIES);



  //useEffect() is a function that takes two arguments,
  //a function to run given a certain condition, and then the condition
  useEffect(() => {
    // if categoryData exists or has changed from the response of useQuery, then run dispatch()
    if (categoryData) {
      // execute our dispatch function with our action object indicating
      // the type of action and the data to set our state for categories to
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories
      });
    }
  }, [categoryData, dispatch]);

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map(item => (
        <button
          key={item._id}
          onClick={() => {
            setCategory(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
