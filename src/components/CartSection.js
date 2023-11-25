import "./CartSection.css"

import CartItem from "./CartItem"

export default function CartSection ({
    list,
    handleChangeCart,
    menuClick,
    selectedItemId,
    sectionSelect,
}) {
    const cartList = list.map(item => item[1].inCart && 
        <CartItem 
          key={item[0]} 
          id={item[0]} 
          item={item[1]}
          handleChange={handleChangeCart}
          menuClick={menuClick}
          selected={selectedItemId===item[0]}
        />
    )

    return (
        <>
            {sectionSelect === "Cart" &&
            <div>
                {cartList}
            </div>
            }
        </>
    )
}