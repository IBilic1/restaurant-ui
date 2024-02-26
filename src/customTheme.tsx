import {createTheme} from "@mui/material/styles";
import styled from "@emotion/styled";
import {Field} from "formik";

export const theme = createTheme({
    typography: {
        fontFamily: 'Arial'
    },
    palette: {
        primary: {
            main: '#cd3d6f',
        },
        secondary: {
            main: '#8AAAE5',
        }
    }
})

export const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  display: block;
  margin: 8px;
  color: #333;
`;

export const Input = styled(Field)`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  &[type="email"],
  &[type="password"] {
    width: 100%;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 500;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
`;
