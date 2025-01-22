import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    '@global': {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
    },
    Button: {
      backgroundColor: "#3E3E3E"
    },
    body: {
      backgroundColor: "#1C1D20",
    },
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    buttons: {
      display: "flex",
      flexDirection: "row",
      width: "30%",
      margin: "0 auto",

    },
    toolbar: {
      flexWrap: 'wrap',
      backgroundColor: "#3E3E3E"
    },
    inputEmail: {
      width: "100%",
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    link: {
      margin: theme.spacing(1, 1.5),
      color: "white",
      borderColor: "white",
    },
    heroContent: {
      padding: theme.spacing(2, 0, 6),
    },
    cardHeader: {
      backgroundColor: "black",
    },
    cardPricing: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      marginBottom: theme.spacing(2),
    },
    footer: {
      borderTop: `1px solid ${theme.palette.divider}`,
      marginTop: theme.spacing(8),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
      },
    },
    centralDiv: {
      width: "100%",
      height: "100%",
      margin: "0 auto",
      padding: "55px",
      borderRadius: "8px",
    },
    cadastrarButton: {
      display: "block",
      margin: "auto",
      marginTop: "10px"
    },
  }));
  