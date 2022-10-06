<template>
  <div class="row">
    <div class="col-md-8">
      <edit-profile-form :tips="tips" :firstName="firstName" :lastName="lastName" :address="address" :zip="zip" :email="email">
      </edit-profile-form>
    </div>
    <div class="col-md-4">
      <user-card :name="name" :occupation="occupation" :gender="gender" ></user-card>
    </div>
  </div>
</template>
<script>
import API from '../api/API'
  import EditProfileForm from './Profile/EditProfileForm';
  import UserCard from './Profile/UserCard'
  export default {
    components: {
      EditProfileForm,
      UserCard
    },
    data() {
      return {
        /* model: {
          company: 'Creative Code Inc.',
          email: 'mike@email.com',
          username: 'michael23',
          firstName: 'Mike',
          lastName: 'Andrew',
          address: 'Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09',
          city: 'Melbourne',
          country: 'Australia',
          about: 'Lamborghini Mercy, Your chick she so thirsty, I\'m in that two seat Lambo.'
        },
        user: {
          fullName: 'Mike Andrew',
          title: 'Ceo/Co-Founder',
          description: `Do not be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...`,
        } */
        tips: [],
        firstName: null,
        lastName: null,
        address: null,
        zip: null,
        email: null,
        name: null,
        occupation: null,
        gender: null
      }
    },
    async mounted(){
    const token = window.localStorage.getItem("token");
    try {
      const res = await API.findTip(token)
      this.tips = res.data[0].tips
    } catch (error) {
      
    }
    try {
      
      const res1 = await API.findProfile(token)
      
      const { name, address, zip, email, occupation, gender } = res1.data[0]
      this.firstName = name.split(" ")[0]
      this.lastName = name.split(" ")[1]
      this.address = address;
      this.zip = zip;
      this.email = email
      this.name = name
      this.occupation = occupation
      this.gender = gender
      console.log(this.gender)
    } catch (error) {
      console.log(error)
    }
    
  },
  }
</script>
<style>
</style>
