export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full items-center px-4 md:px-6 border-t bg-white bg-opacity-80 backdrop-blur-md dark:bg-gray-800 dark:bg-opacity-80">
      <p className="text-xs text-gray-700 dark:text-gray-400">
        © 2024 MaintenancePro. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <a
          className="text-xs hover:underline underline-offset-4 text-gray-700"
          href="#"
        >
          Terms of Service
        </a>
        <a
          className="text-xs hover:underline underline-offset-4 text-gray-700"
          href="#"
        >
          Privacy
        </a>
      </nav>
    </footer>
  );
}
