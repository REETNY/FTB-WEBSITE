import React from 'react';
import styles from "./signup.module.css";
import Create_Account from '../_components/CREATE/Create_Account';
import { Metadata } from 'next';
import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';

export const metadata:Metadata = {
  title: "Sign Up",
  description: "Create user page"
}

export default function page({searchParams}:{searchParams: {[key:string]:string}}) {

  const back_to = searchParams?.back_to || null;

  return (
    <section className={styles.loginContainer}>

      <div className={styles.login_intro}>
        <div className={styles.benefit}>Benefit of Creating an Account</div>
        <ul className={styles.advantages}>

          <li className={styles.advan}>
            <span><FaCheck /></span>
            <span>Log the movies and TV shows you have watched</span>
          </li>
          
          <li className={styles.advan}>
            <span><FaCheck /></span>
            <span>Keep track of your favourite movies and TV shows and get recommendations from them</span>
          </li>

          <li className={styles.advan}>
            <span><FaCheck /></span>
            <span>Build and maintain a personal watchlist</span>
          </li>

          <li className={styles.advan}>
            <span><FaCheck /></span>
            <span>Build custom mixed lists (movies and TV)</span>
          </li>

          <li className={styles.advan}>
            <span><FaCheck /></span>
            <span> Find something to watch on your subscribed streaming services</span>
          </li>

        </ul>

      </div>

      <div className={styles.container_login}>

        <div className={styles.con_log_head}>
          Sign up for an account
        </div>

        <Create_Account back={back_to} />

        <div>Already have an account! <Link href={(back_to?.length == 0 || back_to == null) ? `/login` : `/login?back_to=${back_to}`}>signin here</Link></div>

      </div>

    </section>
  )
}
