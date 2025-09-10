import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearSession } from '../../store/Auth/authReducer';
import { EditProfileModal } from '../Modal';

const deanPages = ['Мероприятия', 'Заявки', 'Партнеры'];
const studentPages = ['Мероприятия', 'Билеты'];

const Header = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const { isAuth, login, role } = useAppSelector((state) => state.authReducer);
    const [open, setOpen] = React.useState<boolean>(false);

    const navigate: any = useNavigate();
    const dispatch: any = useDispatch();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleLogout = () => {
        handleCloseUserMenu();
        dispatch(clearSession());
        navigate('/auth/sign-in');
    };
    const handleProfile = () => {
        handleCloseUserMenu();
        setOpen(true);
    };
    React.useEffect(() => {
        console.log('Is open ' + open);
    }, [open]);

    return (
        <AppBar position='static'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Typography
                        variant='h6'
                        noWrap
                        component='a'
                        href='/'
                        sx={{
                            mr: 6,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 800,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        HITS
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size='large'
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleOpenNavMenu}
                            color='inherit'
                        >
                            <MenuIcon />
                        </IconButton>
                        {isAuth && (
                            <Menu
                                id='menu-appbar'
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                                {(role == 'DEAN' ? deanPages : studentPages).map(
                                    (item: string, index: number) => (
                                        <MenuItem key={index} onClick={handleCloseNavMenu}>
                                            <Typography sx={{ textAlign: 'center' }}>
                                                {item}
                                            </Typography>
                                        </MenuItem>
                                    ),
                                )}
                            </Menu>
                        )}
                    </Box>
                    <Typography
                        variant='h5'
                        noWrap
                        component='a'
                        href='/'
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 800,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        HITS
                    </Typography>
                    {isAuth && (
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {(role == 'DEAN' ? deanPages : studentPages).map(
                                (item: string, index: number) => (
                                    <Button
                                        key={index}
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        {item}
                                    </Button>
                                ),
                            )}
                        </Box>
                    )}
                    <Box sx={{ flexGrow: 0 }}>
                        {login && (
                            <>
                                <Tooltip title='Настройки'>
                                    <Button
                                        color='inherit'
                                        variant='text'
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 0, textTransform: 'none', fontSize: '16px' }}
                                    >
                                        {login}
                                    </Button>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id='menu-appbar'
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={handleProfile}>
                                        <Typography sx={{ textAlign: 'center' }}>
                                            Профиль
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <Typography sx={{ textAlign: 'center' }}>Выйти</Typography>
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </Container>
            <EditProfileModal
                isOpen={open}
                handleClick={() => {
                    setOpen(false);
                }}
            />
        </AppBar>
    );
};

export default Header;
