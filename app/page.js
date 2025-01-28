"use client";
import React, { useEffect, useState, useContext } from 'react';
import GlobalApi from '@/Shared/GlobalApi';
import BusinessList from '@/components/Home/BusinessList';
import CategoryList from '@/components/Home/CategoryList';
import GoogleMapView from '@/components/Home/GoogleMapView';
import RangeSelect from '@/components/Home/RangeSelect';
import SelectRating from '@/components/Home/SelectRating';
import SkeltonLoading from '@/components/SkeltonLoading';
import { UserLocationContext } from '@/context/UserLocationContext';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: session } = useSession();
  const [category, setCategory] = useState();
  const [radius, setRadius] = useState(4); // เปลี่ยนค่าเริ่มต้นเป็น 4 กิโลเมตร
  const [businessList, setBusinessList] = useState([]);
  const [businessListOrg, setBusinessListOrg] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { userLocation, setUserLocation } = useContext(UserLocationContext);

  useEffect(() => {
    if (!session?.user) {
      router.push('/Login');
    }
  }, [session]);

  useEffect(() => {
    if (category && userLocation) {
      getGooglePlace();
    }
  }, [category, radius, userLocation]);

  const getGooglePlace = () => {
    if (category && userLocation) {
      setLoading(true);
      const radiusInMeters = radius * 1000; // แปลงกิโลเมตรเป็นเมตร
      GlobalApi.getGooglePlace(category, radiusInMeters, userLocation.lat, userLocation.lng).then(resp => {
        setBusinessList(resp.data.product.results);
        setBusinessListOrg(resp.data.product.results);
        setLoading(false);
      }).catch(error => {
        console.error('Error fetching Google Places:', error);
        setLoading(false);
      });
    }
  };

  const onRatingChange = (rating) => {
    if (rating.length === 0) {
      setBusinessList(businessListOrg);
    } else {
      const result = businessListOrg.filter(item => {
        for (let i = 0; i < rating.length; i++) {
          if (item.rating >= rating[i]) {
            return true;
          }
        }
        return false;
      });
      setBusinessList(result);
    }
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-4'>
      <div className='p-3'>
        <CategoryList onCategoryChange={(value) => setCategory(value)} />
        <RangeSelect onRadiusChange={(value) => setRadius(value)} />
        <SelectRating onRatingChange={(value) => onRatingChange(value)} />
      </div>
      <div className='col-span-3'>
        <GoogleMapView businessList={businessList} />
        <div className='md:absolute mx-2 w-[90%] md:w-[74%] bottom-36 relative md:bottom-3'>
          {!loading ? <BusinessList businessList={businessList} />
            :
            <div className='flex gap-3'>
              {[1, 2, 3, 4, 5].map((item, index) => (
                <SkeltonLoading key={index} />
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  );
}