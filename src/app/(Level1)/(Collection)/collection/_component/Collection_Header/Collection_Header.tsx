"use client"
import React, {useState, useRef, useEffect} from 'react'
import styles from "./collection_head.module.css"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaCaretDown, FaCopy } from 'react-icons/fa'
import { tmdb_image_url } from '@/app/(Level1)/(innerLayout)/_comp/someExports'

export default function Collection_Header({DATA}:{DATA:any}) {
    let image = tmdb_image_url + DATA?.poster_path || "/images/Error_Image.jpg";
    const [copy, setCopy] = useState({
        isClicked: false,
        isCopied: false
    });
    const inputRef = useRef<HTMLInputElement>(null)

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
    let path = slashes_count.length == 2
    ? pathname
    : pathname.slice(0, slashes_count[2].ind);


  return (
    <div className={styles.collecion_header}>
        <div className={styles.headTop}>
            <div className={styles.drop_nav}>
                <span className={styles.drop_nav_content}>Overview <FaCaretDown /></span>
                <span className={styles.drop_nav_item}>
                    <div className={styles.nav_link}>
                        <Link href={path}>Main</Link>
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
                        <Link href={`${path}/backdrops`}>Backdrops</Link>
                    </div>
                    <div className={styles.nav_link}>
                        <Link href={`${path}/posters`}>Poster</Link>
                    </div>
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
