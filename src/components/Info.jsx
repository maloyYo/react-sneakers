import React from 'react'
import AppContext from '../context';

const Info = ({image, title ,description}) => {
    const {setCartOpened} = React.useContext(AppContext);
    return (
        <div className="cartEmpty d-flex flex-column justify-center align-center text-center flex">
        <img
          className="mb-20"
          width={120}
          src={image}
          alt="Cart empty"
        />
        <h2>{title}</h2>
        <p className="opacity-6">
          {description}
        </p>
        <button onClick={() => setCartOpened(false)} className="greenButton mt-40">
          <img className="arrow" src="img/arrow.svg" alt="arrow" />
          Вернуться назад
        </button>
      </div>
    )
}

export default Info;