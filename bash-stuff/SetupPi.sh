#install tools and git
echo "Installing tools...\n"
apt-get update
apt-get upgrade
apt-get install git-all
apt-get install python3

# installs fnm (Fast Node Manager)
curl -fsSL https://fnm.vercel.app/install | bash
# activate fnm
source ~/.bashrc
# download and install Node.js
fnm use --install-if-missing 20

# download pnpm
npm install -g pnpm


#setup stuff
sudo raspi-config 
#Install Python modules
echo "Installing Python modules...\n"
pip3 install gpiozero      #for raspberry pi gpio control
pip3 install numpy			#make sure numpy is available

# fix this
echo "Setting up git...\n"
git config --global user.name "Ronald-Garcia"  #         (must use a name/email connected to the project bitbucket to be able to pull)
git config --global user.email rgarcia0303757@gmail.com

#get custom libraries
echo "Cloning Interlock code. Please provide the password.\n"
git clone https://github.com/Ronald-Garcia/gatekeeper.git

cd gatekeeper/WSEIdentify/web && pnpm install
pnpm dev

cd ~ 

echo "Configuring UART port"
gpio mode 15 ALT5
gpio mode 16 ALT5


cd /boot
sudo echo "\nenable_uart=1\n" >> config.txt

# i dont know what this is about
echo "Now execute sudo nano /boot/cmdline.txt and remove all references to serial0 (i.e. console=serial0,115200)\n"
echo "Then reboot and run 'gpio readall'. Ensure that TxD and RxD pins are set to ALT5 and NOT to IN"
echo "If they have reset themselves, run sudo raspi-config and select interface options. Select Serial and disable the login shell but enable the serial hardware. Reboot."