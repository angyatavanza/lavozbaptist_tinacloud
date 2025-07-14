 import { Logo } from "./ui/logo";

 <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-12 lg:grid-cols-12 3xl:grid-cols-12 gap-3.75 px-6">
                <div className="col-span-2 sm:col-span-3 lg:col-span-3 3xl:col-span-3">
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                        <Logo className="w-5 h-5 text-white fill-current" />
                        </div>
                        <span className="font-playfair font-bold text-lg">
                        Red Cross
                        </span>
                    </div>
                    <p className="text-gray-400">
                        Preventing and alleviating human suffering wherever it may be
                        found.
                    </p>
                </div>

                <div className="col-span-2 sm:col-span-3 lg:col-span-3 3xl:col-span-3">
                <h4 className="font-bold  mb-4">Get Involved</h4>
                <ul className="space-y-2 text-gray-400">
                    <li>
                    <a href="#" className="hover:text-white transition-colors">
                        Volunteer
                    </a>
                    </li>
                    <li>
                    <a href="#" className="hover:text-white transition-colors">
                        Donate Blood
                    </a>
                    </li>
                    <li>
                    <a href="#" className="hover:text-white transition-colors">
                        Become a Member
                    </a>
                    </li>
                    <li>
                    <a href="#" className="hover:text-white transition-colors">
                        Corporate Partners
                    </a>
                    </li>
                </ul>
                </div>

                <div className="col-span-2 sm:col-span-3 lg:col-span-3 3xl:col-span-3">
                <h4 className="font-bold  mb-4">Recursos Comunitarios</h4>
                <ul className="space-y-2 text-gray-400">
                    <li>
                    <a href="#" className="hover:text-white transition-colors">
                        Recursos Comunitarios
                    </a>
                    </li>
                </ul>
                </div>

                <div className="col-span-2 sm:col-span-3 lg:col-span-3 3xl:col-span-3">
                <h4 className="font-bold  mb-4">Contact & Donations</h4>
                <ul className="space-y-2 text-gray-400">
                    <li>
                    <a href="#" className="hover:text-white transition-colors">
                        Haz tu Donación en Linea
                    </a>
                    </li>
                    <li>1-800-RED-CROSS</li>
                    <li>info@redcross.org</li>
                    <li>Find Local Chapter</li>
                </ul>
                </div>
            </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 American Red Cross. All rights reserved.</p>
          </div>
        </div>
      </footer>