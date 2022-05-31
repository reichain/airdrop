import {
    makeStyles,
    StylesProvider,
    ThemeProvider,
} from '@material-ui/core/styles'
import appStyle, { APP_STYLE_PROPS } from 'assets/jss/appStyle'
import createTheme from 'assets/jss/appTheme'
import { useEtherProvider } from 'components/EtherProvider/EtherProvider'
import Footer from 'components/Footer/Footer'
import Header from 'components/Header/Header'
import HeaderLinks from 'components/HeaderLinks/HeaderLinks'
import { useSwitchTheme } from 'components/ThemeProvider/ThemeProvider'
import {
    initialize as initializeFirebase,
    setAnalyticsEnabled,
} from 'config/firebaseConfig'
import { createWeb3Modal } from 'helpers/createWeb3Modal'
import Airdrop from 'pages/Airdrop/Airdrop'
import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Core as Web3Modal } from 'web3modal/dist/core'
import './App.scss'

const useStyles = makeStyles<null, APP_STYLE_PROPS>(appStyle)

function App() {
    const classes = useStyles({})
    const { themeName } = useSwitchTheme()
    const theme = createTheme(themeName)

    const {
        connectWallet,
        connectGuestWallet,
        address,
        connected,
        disconnectWallet,
        networkId,
        provider,
    } = useEtherProvider()

    const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null)

    useEffect(() => {
        setWeb3Modal(createWeb3Modal())
    }, [])

    useEffect(() => {
        ;(async () => {
            if (provider) {
                // already initalized provider
                return
            }

            if (web3Modal) {
                // connectGuestWallet()

                if (web3Modal.cachedProvider || window.ethereum) {
                    try {
                        await connectWallet(web3Modal)
                        return // connect wallet successfully
                    } catch (e) {}
                }
            }
        })()
    }, [web3Modal, connectWallet, connectGuestWallet, provider])

    useEffect(() => {
        // initializeGTM()
        // initializeFirebase()
        // setAnalyticsEnabled(true)
    }, [])

    const location = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.key])

    return (
        <StylesProvider injectFirst>
            <ThemeProvider theme={theme}>
                <main className={classes.main}>
                    <Header
                        links={
                            <HeaderLinks
                                address={address}
                                connected={connected}
                                connectWallet={() => {
                                    if (web3Modal) {
                                        connectWallet(web3Modal)
                                    }
                                }}
                                disconnectWallet={() => {
                                    if (web3Modal) {
                                        disconnectWallet(web3Modal)
                                    }
                                }}
                            />
                        }
                    />
                    <div
                        className="_w-100pct _pst-asl _t-0px"
                        style={{
                            paddingTop: 'var(--header-height)',
                            height: 550,
                            background:
                                'radial-gradient(96.12% 96.12% at 50% 3.88%, #F4DE80 34.71%, rgba(244, 222, 128, 0) 100%)',
                        }}
                    />

                    <Routes>
                        <Route path="" element={<Airdrop />} />
                    </Routes>

                    <Footer />
                </main>
            </ThemeProvider>
        </StylesProvider>
    )
}

export default App
