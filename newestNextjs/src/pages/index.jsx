import React from "react";
import Link from "next/link";
import { Button, SelfHeader } from "@components";
import styles from "@assets/css/Home.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <SelfHeader />
      <h1>Sea Grass Frame --- NextJs</h1>

      <div>
        <Button>
          <Link href="/dashboard/jianding9" passHref>
            dashboard
          </Link>
        </Button>
        <Button className={styles.rbtn}>
          <Link href="/reducer" passHref>
            reducer
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default Home;
