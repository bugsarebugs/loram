import { FaCopy, FaAppStore , FaAndroid, FaApplePay, FaWindows, FaLinux} from "react-icons/fa"
import Link from "next/link";

export default function HowTo(){
    return (
        <div className="flex align-middle justify-center self-center items-center h-auto m-20 text-black dark:text-white">
            <span className="w-140  text-wrap text-justify">
                <p>Click on any movie</p> 
                <p>Click download to save the torrent file on your phone or computer or click the <FaCopy className="inline-block"/> icon to copy the link</p> 
                <p>Then paste your link on any torrent downloader in your mobile or computer</p>
                <h1>Best Torrent Downloaders</h1>
                <span >For IOS <FaAppStore className="inline-block size-20"/>
                    <p>Use iSH and Transmission-cli for Proffesions only. Link - <Link href="https://www.youtube.com/watch?v=DtljwV9kTrI&pp=ygUZaXBob25lIHRvcnJlbnQgZG93bmxvYWRlcg%3D%3D " className="text-2xl text-blue-400">Here is how</Link></p>
                    <p className="text-red-400">Ooops! Iphone does not allows torrents for Non Professions... We are doing something for you guys. A little bit</p>
                </span>
                <span>For Android Users <FaAndroid className="inline-block size-20"/>
                    <p>Just use Bit-Torrent client Very easy. - <Link href="https://play.google.com/store/apps/details?id=com.bittorrent.client" className="text-2xl text-blue-400">qbittorent in playstore</Link></p>
                    <p>Alternatively best use Free downlaoder manager too <Link href="https://play.google.com/store/apps/details?id=org.freedownloadmanager.fdm" className="text-2xl text-blue-400">FDM here</Link></p>
                </span>
                <span>For Mac users <FaApplePay className="inline-block size-20"/>
                    <p>Just use free Downloader manager. - <Link href="https://files2.freedownloadmanager.org/6/latest/fdm.dmg" className="text-2xl text-blue-400">FDM in Safari</Link>  </p>
                </span>
                 <span>For linux users <FaLinux className="inline-block size-20"/>
                    <p>Just use free Downloader manager. - <Link href="https://files2.freedownloadmanager.org/6/latest/freedownloadmanager.deb" className="text-2xl text-blue-400">FDM in Linux</Link>  </p>
                </span>
                <span>For Window users <FaWindows className="inline-block size-20"/>
                    <p>Just use free Downloader manager. - <Link href="https://files2.freedownloadmanager.org/6/latest/fdm_x64_setup.exe" className="text-2xl text-blue-400">FDM in Windows</Link>  </p>
                </span>
                <h1>Hope it helps ..... Welcome again buddies</h1> 
                <span className="text-red-400 text-center text-2xl"> Donate hata buku wanetu</span>
            </span>
        </div>
    )
}