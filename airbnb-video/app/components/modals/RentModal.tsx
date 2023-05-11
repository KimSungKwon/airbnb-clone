'use client';

import { useState, useMemo } from "react";
import { FieldValues, useForm } from "react-hook-form";

import useRentModal from "@/app/hooks/useRentModal";

import Modal from "./Modal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";


enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5
}

const RentModal = () => {
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY); // initial: 0

  // Listing schema
  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      batchroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: ''
    }
  });

  // 값들 변수로 저장
  const category = watch('category');


  // Form의 id에 해당하는 값을 value로 바꿈. 즉, Form에 value들을 채움
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const onBack = () => {
    setStep((value) => value - 1);
  }

  const onNext = () => {
    setStep((value) => value + 1);
  }

  //  버튼의 레이블 설정
  const actionLabel = useMemo(() => {
    if (step == STEPS.PRICE) {
      return 'Create';
    }
    return 'Next';
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step == STEPS.CATEGORY) {
      return undefined;
    }
    return 'Back';
  }, [step])

  /*
  *   CATEGORY Step
  */
  let bodyContent = ( // Step에 따라 bodyContent의 값을 변경할거라 let
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput 
              onClick={(category) => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )

  /*
  *   action button: Next, Create Button
  *   secondary action button: Back Button
  */
  return (  
    <Modal 
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Airbnb your home!"
      body={bodyContent}
    />
  );
}
 
export default RentModal;