import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { shades } from "../../theme";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "../../state";
import { useNavigate } from "react-router-dom";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item?.data?.attributes.price;
  }, 0);

  return (
    <Box
      display={isCartOpen ? "block" : "none"}
      backgroundColor="rgba(0, 0, 0, 0.4)"
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
    >
      <Box
        position="fixed"
        right="0"
        bottom="0"
        width="max(400px, 30%)"
        height="100%"
        backgroundColor="white"
      >
        <Box padding="30px" overflow="auto" height="100%">
          {/* HEADER */}
          <FlexBox mb="15px">
            <Typography variant="h3">SHOPPING BAG ({cart.length})</Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

          {/* CART LIST */}
          <Box>
            {cart.map((item) => (
              <Box key={`${item?.data?.attributes.name}-${item?.data?.id}`}>
                <FlexBox p="15px 0">
                  <Box flex="1 1 40%">
                    {item?.data ? (
                      <img
                        alt={item?.data?.name}
                        width="123px"
                        height="164px"
                        src={`https://strapi-w9tt.onrender.com${item?.data?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                      />
                    ) : (
                      <img
                        alt={item?.data?.name}
                        width="123px"
                        height="164px"
                        src={`https://strapi-w9tt.onrender.com${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                      />
                    )}
                    {/* 
                    <img
                      alt={item?.data?.name}
                      width="123px"
                      height="164px"
                      src={`https://strapi-w9tt.onrender.com{item?.data?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                    /> */}

                    {/* {console.log("hee", item)} */}
                  </Box>
                  <Box flex="1 1 60%">
                    <FlexBox mb="5px">
                      <Typography fontWeight="bold">
                        {item?.data?.attributes.name}
                        {/* {console.log("hahahha", item?.data?.attributes)} */}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          dispatch(removeFromCart({ id: item?.data?.id }))
                        }
                      >
                        {/* {console.log("remove", item?.data?.id)} */}
                        <CloseIcon />
                      </IconButton>
                    </FlexBox>
                    <Typography>
                      {
                        item?.data?.attributes.shortDescription[0].children[0]
                          .text
                      }
                      {/* {console.log(
                        "test1",
                        item.data.attributes.shortDescription[0].children[0]
                          .text
                      )} */}
                    </Typography>
                    <FlexBox m="15px 0">
                      <Box
                        display="flex"
                        alignItems="center"
                        border={`1.5px solid ${shades.neutral[500]}`}
                      >
                        <IconButton
                          onClick={() =>
                            dispatch(decreaseCount({ id: item.data.id }))
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.count}</Typography>
                        <IconButton
                          onClick={() =>
                            dispatch(increaseCount({ id: item.data.id }))
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      <Typography fontWeight="bold">
                        ₹{item?.data?.attributes.price}
                        {/* {console.log(item.data.attributes.price)} */}
                      </Typography>
                    </FlexBox>
                  </Box>
                </FlexBox>
                <Divider />
              </Box>
            ))}
          </Box>

          {/* ACTIONS */}
          <Box m="20px 0">
            <FlexBox m="20px 0">
              <Typography fontWeight="bold">SUBTOTAL</Typography>
              <Typography fontWeight="bold">₹{totalPrice}</Typography>
            </FlexBox>
            <Button
              sx={{
                backgroundColor: shades.primary[400],
                color: "white",
                borderRadius: 0,
                minWidth: "100%",
                padding: "20px 40px",
                m: "20px 0",
              }}
              onClick={() => {
                navigate("/checkout");
                dispatch(setIsCartOpen({}));
              }}
            >
              CHECKOUT
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartMenu;
