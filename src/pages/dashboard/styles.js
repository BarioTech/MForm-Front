import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    body: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    MDBDropdown: {
        marginLeft: "14px"
    },
    titleGD: {
        fontFamily: 'Courier New',
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    inputEmail: {
        width: "100%",
    },
    toolbarTitle: {
        flexGrow: 1,
    },
 
    btn: {
        backgroundColor: "#F5F5F5",
    },
    dropdownsContainer: {
        display: "inline-flex",
        padding: "14px",
        justifyContent: "center",
    },
    dropdownItem: {
        backgroundColor: "#F5F5F5",
        marginLeft: "14px"
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 0),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
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

        padding: "55px",
        //  border: "1px solid",
        borderRadius: "8px",
    },
    icone: {
        width: "30px",
        height: "30px",
    },
    tabelaContainer: {
        display: "block", 
        textAlign: "left", 
        margin: "0 auto", 
        padding: "0",   
        width: "100%",   
    },
}));
