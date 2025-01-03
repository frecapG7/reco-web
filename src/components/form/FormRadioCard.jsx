import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  FormControl,
  FormControlLabel,
  Grid2 as Grid,
  Radio,
  RadioGroup,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useController } from "react-hook-form";

export const FormRadioCard = ({
  control,
  name,
  options = [],
  onValueChange,
}) => {
  const {
    field: { value, onChange },
  } = useController({
    control,
    name,
    defaultValue: "",
  });

  const isUpSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return (
    <FormControl fullWidth>
      <RadioGroup
        value={value}
        onChange={(e) => {
          const newValue = e.target.value;
          onChange(newValue);
          onValueChange && onValueChange(newValue);
        }}
      >
        <Grid container spacing={2} justifyContent="space-evenly" width="100%">
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option.value}
              control={
                <Radio
                  icon={
                    <Card>
                      <CardActionArea>
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          flexDirection="column"
                        >
                          {option.icon && (
                            <CardMedia
                              component={option.icon}
                              alt={option.label}
                            />
                          )}
                          {isUpSm && (
                            <CardContent>
                              <Typography variant="h5" component="h2">
                                {option.label}
                              </Typography>
                            </CardContent>
                          )}
                        </Box>
                      </CardActionArea>
                    </Card>
                  }
                  checkedIcon={
                    <Card
                      sx={{
                        backgroundColor: "primary.main",
                      }}
                    >
                      <CardActionArea>
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          flexDirection="column"
                        >
                          {option.icon && (
                            <CardMedia
                              component={option.icon}
                              alt={option.label}
                            />
                          )}
                          <CardContent>
                            <Typography variant="h5" component="h2">
                              {option.label}
                            </Typography>
                          </CardContent>
                        </Box>
                      </CardActionArea>
                    </Card>
                  }
                />
              }
            />
          ))}
        </Grid>
      </RadioGroup>
    </FormControl>
  );
};
