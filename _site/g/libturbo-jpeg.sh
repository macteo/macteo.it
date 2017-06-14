#!/bin/bash
brew install libtool automake autoconf nasm git

mkdir libjpeg-turbo

cd libjpeg-turbo

mkdir libs

git clone https://github.com/libjpeg-turbo/libjpeg-turbo.git src

cd src

autoreconf -fi

IOS_PLATFORMDIR=$(xcrun --sdk iphoneos --show-sdk-platform-path)
IOS_SYSROOT=$(xcrun --sdk iphoneos --show-sdk-path)
IOS_SIMULATOR_PLATFORMDIR=$(xcrun --sdk iphoneos --show-sdk-platform-path)
IOS_SIMULATOR_SYSROOT=$(xcrun --sdk iphonesimulator --show-sdk-path)
IOS_GCC=$(/usr/bin/xcode-select -p)/Toolchains/XcodeDefault.xctoolchain/usr/bin/clang

## armv7
echo "--- Building for armv7 ---"
make clean
IOS_CFLAGS="-arch armv7 -miphoneos-version-min=8.0"
./configure --host arm-apple-darwin \
    --enable-silent-rules \
    CC="$IOS_GCC" LD="$IOS_GCC" \
    CFLAGS="-mfloat-abi=softfp -isysroot $IOS_SYSROOT -O3 $IOS_CFLAGS -fembed-bitcode" \
    LDFLAGS="-mfloat-abi=softfp -isysroot $IOS_SYSROOT $IOS_CFLAGS" \
    CCASFLAGS="-no-integrated-as $IOS_CFLAGS" \
    NASM=/usr/local/bin/nasm
make
mv -v .libs/libturbojpeg.a ../libs/libturbojpeg_armv7_a

## armv7s
echo "--- Building for armv7s ---"
make clean
IOS_CFLAGS="-arch armv7s -miphoneos-version-min=8.0"
./configure --host arm-apple-darwin \
    --enable-silent-rules \
    CC="$IOS_GCC" LD="$IOS_GCC" \
    CFLAGS="-mfloat-abi=softfp -isysroot $IOS_SYSROOT -O3 $IOS_CFLAGS -fembed-bitcode" \
    LDFLAGS="-mfloat-abi=softfp -isysroot $IOS_SYSROOT $IOS_CFLAGS" \
    CCASFLAGS="-no-integrated-as $IOS_CFLAGS" \
    NASM=/usr/local/bin/nasm
make
mv -v .libs/libturbojpeg.a ../libs/libturbojpeg_armv7s_a

## arm64
echo "--- Building for arm64 ---"
make clean
IOS_CFLAGS="-arch arm64 -miphoneos-version-min=8.0"
./configure --host aarch64-apple-darwin \
    --enable-silent-rules \
    CC="$IOS_GCC" LD="$IOS_GCC" \
    CFLAGS="-isysroot $IOS_SYSROOT -O3 $IOS_CFLAGS -fembed-bitcode" \
    LDFLAGS="-isysroot $IOS_SYSROOT $IOS_CFLAGS" \
    NASM=/usr/local/bin/nasm
make
mv -v .libs/libturbojpeg.a ../libs/libturbojpeg_arm64_a


## i386 (32-bit Build on 64-bit OS X ==> i686)
echo "--- Building for i386 (32-bit Build on 64-bit OS X ==> i686) ---"
make clean
./configure --host i686-apple-darwin \
    --enable-silent-rules \
    CFLAGS="-O3 -m32 -arch i386 -fembed-bitcode -isysroot $IOS_SIMULATOR_SYSROOT -mios-simulator-version-min=8.0" \
    LDFLAGS=-m32 \
    NASM=/usr/local/bin/nasm
make
mv -v .libs/libturbojpeg.a ../libs/libturbojpeg_x86_a


##  x86_64
echo "--- Building for x86_64 ---"
make clean
./configure --host x86_64-apple-darwin \
    CFLAGS="-arch x86_64 -fembed-bitcode -isysroot $IOS_SIMULATOR_SYSROOT -mios-simulator-version-min=8.0" \
    NASM=/usr/local/bin/nasm
make 
mv -v .libs/libturbojpeg.a ../libs/libturbojpeg_x86_64_a

## lipo
mkdir -p ../libs/ios/device
mkdir -p ../libs/ios/simulator
mkdir -p ../libs/ios/universal

# Device fat binary
xcrun -sdk iphoneos lipo -arch armv7 ../libs/libturbojpeg_armv7_a -arch armv7s ../libs/libturbojpeg_armv7s_a -arch arm64 ../libs/libturbojpeg_arm64_a -create -output ../libs/ios/device/libturbojpeg.a
# Simulator fat binary
xcrun -sdk iphoneos lipo -arch i386 ../libs/libturbojpeg_x86_a -arch x86_64 ../libs/libturbojpeg_x86_64_a -create -output ../libs/ios/simulator/libturbojpeg.a
# Universal fat binary
xcrun -sdk iphoneos lipo -arch armv7 ../libs/libturbojpeg_armv7_a -arch armv7s ../libs/libturbojpeg_armv7s_a -arch arm64 ../libs/libturbojpeg_arm64_a -arch i386 ../libs/libturbojpeg_x86_a -arch x86_64 ../libs/libturbojpeg_x86_64_a -create -output ../libs/ios/universal/libturbojpeg.a
# Removing thin binaries
rm -f ../libs/*_a
