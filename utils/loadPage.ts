import Router from "next/router";
import { SyntheticEvent } from "react";

export const loadPage = (e: SyntheticEvent, url: string) => {
  e.preventDefault();
  Router.push(url);
};
