import { supabase } from '../config/supabaseConfig.js'
import { v4 as uuidv4 } from 'uuid';

// function generateApiKeyUUID() {
//   return uuidv4();  
// }
// console.log(generateApiKeyUUID());

const getIndex = (req, res) => {
    res.render('index.ejs')
};


const getScraped = async (req, res) => {
    try {
    // Query Supabase for all records
    const { data, error, status } = await supabase
      .from('raw_data')
      .select('*');

    if (error) {
      console.error(`Supabase error [${status}]:`, error.message);
      return res.status(status).json({ error: error.message });
    }
    // console.log(data)
    // return res.status(200).json({ data });
      res.render('scrape.ejs', {items: data})

  } catch (err) {
    console.error('Unexpected error fetching records:', err);
    // return res.status(500).json({ error: 'Internal server error' });
      res.render('scrape.ejs', {items: data})

  }
}

const postScraped = async (req, res) => {
  try {
    const { source_url, raw_payload, metadata } = req.body
    // Insert into Supabase
    const { data, error } = await supabase
      .from('raw_data')
      .insert([
        {
          source_url,
          raw_payload,
          metadata,
        }
      ])

    if (error) {
      console.error('Supabase insert error:', error)
      return res.status(500).json({ error: error.message })
    }
   res.redirect('/scrape')
  } catch (err) {
    console.error('Unexpected error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
};

export {getIndex, getScraped, postScraped };