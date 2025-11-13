// src/controllers/profileController.js
import { profileService } from "../services/profileService.js";

export const createOrUpdate = async (req, res) => {
  try {
    const userId = req.user.id;
    const profileData = req.body;
    
    const profile = await profileService.createOrUpdate(userId, profileData);
    
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await profileService.get(userId);
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message
    });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    await profileService.delete(userId);
    
    res.status(200).json({
      success: true,
      message: 'Profile deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting profile',
      error: error.message
    });
  }
};

export const getCompleteProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const completeProfile = await profileService.getCompleteProfile(userId);
    
    res.status(200).json({
      success: true,
      data: completeProfile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching complete profile',
      error: error.message
    });
  }
};

export const getProfileForForm = async (req, res) => {
  try {
    const userId = req.user.id;
    const formData = await profileService.getProfileForForm(userId);
    
    res.status(200).json({
      success: true,
      data: formData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profile form data',
      error: error.message
    });
  }
};

export const updateCompleteProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profileData = req.body;
    
    const updatedProfile = await profileService.updateCompleteProfile(userId, profileData);
    
    res.status(200).json({
      success: true,
      message: 'Complete profile updated successfully',
      data: updatedProfile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating complete profile',
      error: error.message
    });
  }
};