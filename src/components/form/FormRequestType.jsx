import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  FormControl,
  FormHelperText,
  Grid,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useController } from "react-hook-form";

import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import AudiotrackOutlinedIcon from "@mui/icons-material/AudiotrackOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import { i18nFormError } from "../../i18n/i18nForm";
const options = [
  {
    value: "BOOK",
    label: "Book request",
    icon: MenuBookOutlinedIcon,
  },
  {
    value: "SONG",
    label: "Song request",
    icon: AudiotrackOutlinedIcon,
  },
  {
    value: "MOVIE",
    label: "Movie request",
    icon: MovieOutlinedIcon,
  },
];

export const FormRequestType = ({ control, name, rules }) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    control,
    name,
    rules,
  });

  return (
    <FormControl fullWidth>
      <RadioGroup value={value} onChange={onChange}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{
            border: error ? "1px solid red" : "0px solid #ddd",
            borderRadius: 10,
            paddingY: 5,
          }}
        >
          {options.map((option) => (
            <Grid item key={option.value}>
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  boxShadow: 2,
                  backgroundColor:
                    value === option.value ? "secondary.light" : "white",
                  borderColor:
                    value === option.value ? "secondary.main" : "greyed.main",
                  borderWidth: 2,
                  borderStyle: "solid",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    borderColor: "primary.main",
                    cursor: "pointer",
                  },
                  width: "100%",
                }}
              >
                <CardActionArea
                  onClick={() => {
                    onChange(option.value);
                  }}
                  sx={{
                    height: "10.375rem",
                  }}
                >
                  {option.icon && (
                    <CardMedia
                      component={option.icon}
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        marginTop: 2,
                        color:
                          value === option.value
                            ? "primary.main"
                            : "greyed.dark",
                      }}
                    />
                  )}
                  <CardContent
                    sx={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant="label"
                      textAlign="center"
                      paragraph
                      sx={{
                        width: "100%",
                        justifyContent: "center",
                        overflowWrap: "break-word",
                        color:
                          value === option.value
                            ? "primary.main"
                            : "greyed.dark",
                        fontWeight: value === option.value ? "bold" : "normal",
                      }}
                    >
                      {option.label}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </RadioGroup>
      <FormHelperText error={!!error}>{i18nFormError(error)}</FormHelperText>
    </FormControl>
  );
};
