"use client";

export default function HamburgerMenuButton() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="mr-5 h-6 w-6 md:hidden"
      onClick={() => {
        const menu = document.querySelector("#menu_vertical");
        if (menu?.classList.contains("hidden")) {
          menu.classList.remove("hidden");
        } else {
          menu?.classList.add("hidden");
        }
      }}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
      />
    </svg>
  );
}
