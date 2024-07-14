"use client"
import React, {useState, useRef, useEffect} from 'react'
import styles from "./season_header.module.css";
import { FaArrowLeft, FaCaretDown, FaCopy } from 'react-icons/fa';
import Link from 'next/link';
import Image01 from '@/components/ImageComponents/Image01';
import { tmdb_image_url } from '@/app/(Level1)/(innerLayout)/_comp/someExports';
import { DataContext } from '@/app/(Level1)/(innerLayout)/_comp/Data_Provider/DataProvider';
import { useContext } from 'react';
import { usePathname } from 'next/navigation';


function getYear(val:string) {
    return new Date(val).getFullYear()
}

export default function Season_Header({DATA, SN, NAV_VID, SI}:{SI: number, DATA:any, SN:string, NAV_VID:string[]}) {
    let FTC = useContext(DataContext);
    let image = tmdb_image_url + DATA?.poster_path || "/images/Error_Image.jpg";
    const [copy, setCopy] = useState({
        isClicked: false,
        isCopied: false
    });
    const inputRef = useRef<HTMLInputElement>(null)

    const styles_main = {
        background: `${FTC?.DarkVibrant}`
    };
    
    const locate = window?.location?.protocol + window?.location?.host;
    const pathname = usePathname();
    const pathname_count = pathname.split("");
    const slashes_count: {item:string, ind:number}[] = [];
    pathname_count?.map((item:string, index:number) => {
        if(item == "/"){
            slashes_count.push({item, ind:index})
        }
        return
    })
    let path = slashes_count.length == 4
    ? pathname
    : pathname.slice(0, slashes_count[4].ind);

    const nav_vid_els = NAV_VID && NAV_VID.map((item:string, index:number) => {
        let format = item.replaceAll(" ", "_").toLowerCase()
        return (
            <Link key={index} href={`${path}/videos/${format}`}>{item}</Link>
        )
    });

    async function delay() {
        await new Promise((resolve, reject) => setTimeout(resolve, 3000));
        setCopy((obj) => ({...obj, isCopied: false}));
    }

    const operateShare = () => {
        setCopy((obj) => ({...obj, isClicked: !obj.isClicked}));
    }

    const operateCopyLink = () => {
        let value = inputRef?.current?.value;
        navigator.clipboard.writeText(value || "");
        setCopy((obj) => ({...obj, isCopied: true}));
    }

    useEffect(() => {
        if(copy?.isCopied == false)return;
        if(copy?.isCopied == true){
            delay();
        }
    }, [copy.isCopied]);

  return (
    <div className={styles.season_head_container}>

        <div className={styles.headTop}>
            <div className={styles.drop_nav}>
                <span className={styles.drop_nav_content}>Overview <FaCaretDown /></span>
                <span className={styles.drop_nav_item}>
                    <div className={styles.nav_link}>
                        <Link href={path}>Main</Link>
                    </div>
                    <div className={styles.nav_link}>
                        <Link href={`${path}/cast`}>Cast & Crews</Link>
                    </div>
                    <div className={styles.nav_link}>
                        <Link href={`${path}/translation`}>Translations</Link>
                    </div>
                </span>
            </div>
            <div className={styles.drop_nav}>
                <span className={styles.drop_nav_content}>Media <FaCaretDown /></span>
                <span className={styles.drop_nav_item}>
                    <div className={styles.nav_link}>
                        <Link href={`${path}/posters`}>Poster</Link>
                    </div>
                    {NAV_VID.length != 0 && <div className={styles.nav_vid}>
                        <span className={styles.vid_link}>Videos</span>
                        <span className={styles.vid_navs}>
                            {nav_vid_els}
                        </span>
                    </div>}
                </span>
            </div>
            <div className={styles.drop_nav}>
                <span className={styles.drop_nav_content}>Share <FaCaretDown /></span>
                <span className={styles.drop_nav_item}>
                    <div onClick={operateShare} className={styles.nav_btn}>Share Link</div>
                    <div className={styles.nav_btn}>Facebook</div>
                    <div className={styles.nav_btn}>Twitter</div>
                </span>
            </div>
        </div>

        <div style={styles_main} className={styles.headBottom}>

            <div className={styles.head_hero_cont}>
                <Image01 path1={image} path2='' name='' />
            </div>

            <div className={styles.head_content_details}>
                <div className={styles.detail_name_relz}>
                    <span>{SN} {SI == 0 ? `Specials` : `Season ${SI}`}</span>
                    <span>({getYear(DATA?.air_date)})</span>
                </div>
                <div className={styles.details_back_btn}>
                    <Link href={""}><FaArrowLeft /> Back to season</Link>
                </div>
            </div>

        </div>

        {copy.isClicked && <div onClick={operateShare} className={styles.copyLink}></div>}
        {copy.isClicked && <div className={styles.copyLinkCont}>
            <div className={styles.copyLinkHead}>Copy Link</div>
            <div className={styles.copyLinkContent}>
                <div className={styles.copyLinkInput}>
                    <input ref={inputRef} disabled value={locate+path} className={styles.inputed} />
                </div>
                <div onClick={() => operateCopyLink()} className={styles.copyLnkBtn}>
                    <FaCopy />
                </div>
            </div>
        </div>}
        {
            <div className={copy?.isCopied ? `${styles.successCopy} ${styles.active}` : styles.successCopy}>
                Link copied successfully!
            </div>
        }

    </div>
  )
}
